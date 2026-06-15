"use server";

import { apiServer } from "@/app/_lib/axios";
import { Dashboard } from "@/app/_types/dashboard";
import { Product } from "@/app/_types/product";
import { User } from "@/app/_types/user";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export async function getDashboard(): Promise<Dashboard> {
  try {
    const { data } = await apiServer.get<Dashboard>("dashboard");

    const { data: products } = await apiServer.get<Product[]>("product");

    const { data: users } = await apiServer.get<User[]>("user");

    return {
      lowQuantityProducts: data.lowQuantityProducts,
      salesBySeller: data.salesBySeller.map((sale) => {
        return {
          percentageOfTotal: sale.percentageOfTotal,
          sellerId: sale.sellerId,
          sellerName:
            users.find((user) => user.id === sale.sellerId)?.name ?? "-",
          totalSales: sale.totalSales,
        };
      }),
      salesPerProduct: data.salesPerProduct.map((sale) => {
        return {
          productId: sale.productId,
          productName:
            products.find((p) => p.id === sale.productId)?.name ?? "-",
          totalSales: sale.totalSales,
        };
      }),
      stockMetrics: data.stockMetrics,
    };
  } catch (e) {
    console.log(e);

    if (e instanceof AxiosError) {
      if (e.status === 401) {
        redirect("/login");
      }
    }

    throw new Error("Algo aconteceu");
  }
}
