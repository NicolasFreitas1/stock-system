"use server";

import { revalidatePath } from "next/cache";

export async function deleteSale(saleId: string): Promise<void> {
  const response = await fetch(`http://localhost:5000/sale/${saleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar a venda");
  }

  // Revalida o caminho para atualizar a listagem
  revalidatePath("/sales");
}
