import { SignInSchema } from "@/lib/schemas/auth.schema";

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(
    event,
    SignInSchema.parse
  );

  try {
    const user = await getUserByEmail(email, "credentials");
    if (!user) {
      return setResponseStatus(event, 401, "Invalid credentials");
    }

    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      return setResponseStatus(event, 401, "Invalid credentials");
    }

    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    setSessionTokenCookie(event, token, session.expiresAt);

    return { success: true };
  } catch (err) {
    console.log(err); // replace with logger
    setResponseStatus(event, 500, "Internal Server Error");
    return;
  }
});
