import { z } from "zod";

export const upsertSaleSchema = z.object({
  id: z.string().optional(),
  productId: z.string().uuid(),
  quantity: z.number(),
  sellerId: z.string().uuid(),
});

export type UpsertSaleSchema = z.infer<typeof upsertSaleSchema>;
