import { z } from "zod";

export const upsertUserSchema = z.object({
  name: z.string().trim().min(1),
  login: z.string().trim().min(1),
  password: z.string().trim().min(6),
});
