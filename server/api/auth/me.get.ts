export default defineEventHandler(async (event) => {
  return {
    user: event.context.user,
    session: event.context.session,
  };
});
