"use server";

import { redirect } from "next/navigation";

export async function logOut() {
  console.log("asdas");
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
  redirect("/login");
}
