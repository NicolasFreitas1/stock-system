import { PaymentMethod } from "@/app/_constants/sale";
import { z } from "zod";

export const upsertSaleSchema = z.object({
  id: z.string().optional(),
  productId: z.string().uuid(),
  quantity: z.number(),
  sellerId: z.string().uuid(),
  paymentMethod: z.nativeEnum(PaymentMethod),
});

export type UpsertSaleSchema = z.infer<typeof upsertSaleSchema>;
