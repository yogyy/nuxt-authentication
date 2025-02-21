import { z } from "zod";

export const discordCallbackSchema = z.object({
  state: z.string(),
  code: z.string(),
});

export const googleCallbackSchema = discordCallbackSchema.extend({
  scope: z.string(),
  authuser: z.string(),
  prompt: z.string(),
});
