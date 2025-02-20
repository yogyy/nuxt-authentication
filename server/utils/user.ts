type Provider = "credentials" | "google" | "discord";

interface User {
  email: string;
  id: string;
  name: string;
  password?: string;
  avatar?: string;
  provider: Provider;
  providerId?: string;
}

export async function createUser({
  email,
  id,
  name,
  password,
  avatar,
  provider,
  providerId,
}: User) {
  await useDrizzle()
    .insert(tables.users)
    .values({ email, id, name, password, avatar, provider, providerId });
}

export async function getUserByEmail(email: string, provider: Provider) {
  return await useDrizzle().query.users.findFirst({
    where: and(
      eq(tables.users.email, email.toLowerCase()),
      eq(tables.users.provider, provider)
    ),
  });
}
