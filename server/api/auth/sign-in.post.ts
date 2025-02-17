import { SignInSchema } from "@/lib/schemas/auth.schema";

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(
    event,
    SignInSchema.parse
  );

  try {
    const user = await getUserByEmail(email);
    if (!user) throw InvalidCredentialsError;

    const isPasswordValid = await verifyPasswordHash(user.password, password);
    if (!isPasswordValid) throw InvalidCredentialsError;

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

const InvalidCredentialsError = createError({
  statusCode: 401,
  statusMessage: "Invalid credentials",
});
