import { z } from "zod";

export const upsertProductSchema = z.object({
  name: z.string().trim().min(1),
  quantity: z.number().min(1),
  value: z.number().positive(),
  barcode: z.string().trim().min(1),
  tagNames: z.array(z.string()),
});
