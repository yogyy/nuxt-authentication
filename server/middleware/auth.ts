export default defineEventHandler(async (event) => {
  const token = getCookie(event, "session") ?? null;

  if (token === null) {
    event.context.user = null;
    event.context.session = null;
    return;
  }

  const { session, user } = await validateSessionToken(token!);
  if (!session) {
    deleteSessionTokenCookie(event);
    return;
  }
  setSessionTokenCookie(event, token!, session!.expiresAt);

  event.context.user = user;
  event.context.session = session;
  return;
});

declare module "h3" {
  interface H3EventContext {
    user: Omit<User, "password"> | null;
    session: Session | null;
  }
}
