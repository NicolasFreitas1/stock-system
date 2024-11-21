"use server";

import Cookies from "js-cookie";
import { revalidatePath } from "next/cache";

export async function logOut() {
  Cookies.remove("access_token");

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/sales");
  revalidatePath("/users");
}
