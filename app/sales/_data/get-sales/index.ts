"use server";

import { apiServer } from "@/app/_lib/axios";
import { Sale } from "@/app/_types/sale";
import { getProducts } from "@/app/products/_data/get-products";
import { getUsers } from "@/app/users/_data/get-users";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export async function getSales() {
  try {
    const [users, products] = await Promise.all([getUsers(), getProducts()]);

    const { data } = await apiServer.get<Sale[]>("/sale");

    return data.map((sale) => {
      return {
        ...sale,
        productName:
          products?.find((product) => product.id === sale.productId)?.name ??
          "-",
        sellerName:
          users?.find((user) => user.id === sale.sellerId)?.name ?? "-",
      };
    });
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      if (error.status === 401) {
        redirect("/login");
      }

      throw new Error(error.message);
    }
  }
}
