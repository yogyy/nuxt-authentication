export async function createUser(
  email: string,
  id: string,
  name: string,
  hash: string,
  avatar?: string
) {
  await useDrizzle()
    .insert(tables.users)
    .values({ email, id, name, password: hash, avatar });
}

export async function getUserByEmail(email: string) {
  return await useDrizzle().query.users.findFirst({
    where: eq(tables.users.email, email.toLowerCase()),
  });
}
