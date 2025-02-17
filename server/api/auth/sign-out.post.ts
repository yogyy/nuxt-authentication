export default defineEventHandler(async (event) => {
  const session = event.context.session;
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  await invalidateSession(session.id);
  deleteSessionTokenCookie(event);
  return { success: true };
});
