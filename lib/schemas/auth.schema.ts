import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignUpSchema = SignInSchema.extend({
  name: z
    .string()
    .min(4, "Name needs to be at least 4 characters")
    .regex(/^[a-zA-Z0-9]+$/, "name can only contain letters and numbers"),
  avatar: z.string().url().optional(),
});
