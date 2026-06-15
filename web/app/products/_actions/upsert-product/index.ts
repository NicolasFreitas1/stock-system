"use server";

import { apiServer } from "@/app/_lib/axios";
import { upsertProductSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertProductParams {
  id?: string;
  name: string;
  quantity: number;
  value: number;
  barcode: string;
  tagNames: string[];
}

export async function upsertProduct(params: UpsertProductParams) {
  upsertProductSchema.parse(params);

  console.log(params.tagNames);

  if (params.id) {
    await apiServer.put(`/product/${params.id}`, {
      name: params.name,
      barcode: params.barcode,
      quantity: params.quantity,
      value: params.value,
    });

    revalidatePath("/");
    revalidatePath("/products");

    return;
  }

  await apiServer.post("/product", {
    name: params.name,
    barcode: params.barcode,
    quantity: params.quantity,
    value: params.value,
    tagNames: params.tagNames,
  });

  revalidatePath("/");
  revalidatePath("/products");
}
