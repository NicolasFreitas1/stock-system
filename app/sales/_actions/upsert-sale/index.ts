"use server";

import { revalidatePath } from "next/cache";
import { apiServer } from "@/app/_lib/axios";
import { UpsertSaleSchema } from "./schema";

export async function upsertSale(data: UpsertSaleSchema): Promise<void> {
  const url = data.id
    ? `http://localhost:5001/sale/${data.id}`
    : "http://localhost:5001/sale";
  const method = data.id ? "PUT" : "POST";

  try {
    await apiServer({
      method,
      url,
      data,
    });

    // Revalida o caminho para atualizar a listagem
    revalidatePath("/sales");
  } catch (e) {
    console.log(e);
  }
}
