"use server";

import { apiServer } from "@/app/_lib/axios";
import { Product } from "@/app/_types/product";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export async function getProducts() {
  try {
    const { data } = await apiServer.get<Product[]>("/product");

    return data;
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
