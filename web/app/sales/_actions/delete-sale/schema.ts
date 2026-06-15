import { z } from "zod";

export const deleteUserSchema = z.object({
  userId: z.string().uuid(),
});

export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
