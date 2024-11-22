import { z } from "zod";

export const deleteProductSchema = z.object({
  productId: z.string().uuid(),
});

export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
