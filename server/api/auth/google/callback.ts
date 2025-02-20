import { ArcticFetchError, OAuth2RequestError } from "arctic";
import { google } from "~/server/utils/o-auth";
import { GoogleOAuthResponse } from "~/shared/types/oauth-response";
import { googleCallbackSchema } from "~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const { code, state: queryState } = await getValidatedQuery(
    event,
    googleCallbackSchema.parse
  );

  const state = getCookie(event, "google_state");
  const codeVerifier = getCookie(event, "google_code_verifier");

  if (!state || !codeVerifier || state !== queryState) {
    throw createError({ statusCode: 400, statusMessage: "Invalid request" });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const accessToken = tokens.accessToken();

    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const user: GoogleOAuthResponse = await response.json();

    console.log(tokens);

    const userExists = await getUserByEmail(user.email, "google");
    if (userExists) {
      const token = generateSessionToken();
      const session = await createSession(token, userExists.id);
      setSessionTokenCookie(event, token, session.expiresAt);

      return sendRedirect(event, "/home");
    }

    const userId = generateRandId("u");
    await createUser({
      email: user.email.toLowerCase(),
      id: userId,
      name: user.name,
      avatar: user.picture,
      provider: "google",
      providerId: user.sub,
    });

    const token = generateSessionToken();
    const session = await createSession(token, userId);
    setSessionTokenCookie(event, token, session.expiresAt);

    return sendRedirect(event, "/home");
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      const code = e.code;
      console.log(code);
      throw createError({
        statusCode: 500,
        statusMessage: e.message,
      });
    }
    if (e instanceof ArcticFetchError) {
      const cause = e.cause;
      throw createError({
        statusCode: 500,
        statusMessage: cause as string,
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Authentication failed",
    });
  }
});
