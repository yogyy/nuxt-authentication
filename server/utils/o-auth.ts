import { Google, Discord } from "arctic";

const config = useRuntimeConfig();
export const google = new Google(
  config.googleClientId as string,
  config.googleClientSecret as string,
  config.googleRedirectUri as string
);

export const discord = new Discord(
  config.discordClientId as string,
  config.discordClientSecret as string,
  config.discordRedirectUri as string
);
