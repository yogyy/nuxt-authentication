import { z } from "zod";

export const googleCallbackSchema = z.object({
  state: z.string(),
  code: z.string(),
  scope: z.string(),
  authuser: z.string(),
  prompt: z.string(),
});
