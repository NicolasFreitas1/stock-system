"use server";

import { apiServer } from "@/app/_lib/axios";
import { revalidatePath } from "next/cache";

export async function deleteSale(saleId: string): Promise<void> {
  try {
    await apiServer.delete(`/sale/${saleId}`);

    revalidatePath("/sales");
  } catch (e) {
    console.log(e);

    throw new Error("Erro ao deletar venda");
  }
}
