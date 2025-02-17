import { SignUpSchema } from "~/lib/schemas/auth.schema";

export default defineEventHandler(async (event) => {
  const { email, password, name, avatar } = await readValidatedBody(
    event,
    SignUpSchema.parse
  );

  try {
    const userId = generateRandId("u");
    const hash = await hashPassword(password);
    await createUser(email, userId, name, hash, avatar);

    const token = generateSessionToken();
    const session = await createSession(token, userId);
    setSessionTokenCookie(event, token, session.expiresAt);

    return { success: true };
  } catch (err: any) {
    if (
      err.message &&
      err.message.includes("UNIQUE constraint failed") &&
      err.message.includes("emailUniqueIndex")
    ) {
      setResponseStatus(event, 400, "Email Already Used");
      return { success: false };
    }
    console.log(err);
    setResponseStatus(event, 500, "Internal Server Error");
    return;
  }
});
