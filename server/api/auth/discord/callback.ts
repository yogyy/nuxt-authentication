import { OAuth2RequestError } from "arctic";
import { ArcticFetchError } from "arctic";
import { discordCallbackSchema } from "~/server/utils/dto";
import { discord } from "~/server/utils/o-auth";
import { DiscordOAuthResponse } from "~/shared/types/oauth-response";

export default defineEventHandler(async (event) => {
  const { code, state: queryState } = await getValidatedQuery(
    event,
    discordCallbackSchema.parse
  );

  const state = getCookie(event, "discord_state");
  const codeVerifier = getCookie(event, "discord_code_verifier");

  if (!state || !codeVerifier || state !== queryState) {
    throw createError({ statusCode: 400, statusMessage: "Invalid request" });
  }

  try {
    const tokens = await discord.validateAuthorizationCode(code, codeVerifier);
    const accessToken = tokens.accessToken();

    const response = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user: DiscordOAuthResponse = await response.json();

    const userExists = await getUserByEmail(user.email, "discord");
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
      name: user.global_name ?? user.username,
      avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
      provider: "discord",
      providerId: user.id,
    });

    const token = generateSessionToken();
    const session = await createSession(token, userId);
    setSessionTokenCookie(event, token, session.expiresAt);

    return sendRedirect(event, "/home");
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
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
