"use server";

import { apiServer } from "@/app/_lib/axios";
import { DeleteProductSchema } from "./schema";
import { revalidatePath } from "next/cache";

export async function deleteProduct({ productId }: DeleteProductSchema) {
  await apiServer.delete(`product/${productId}`);

  revalidatePath("/");
  revalidatePath("/products");
}
