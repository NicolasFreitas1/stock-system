"use server";

import { apiServer } from "@/app/_lib/axios";
import { Dashboard } from "@/app/_types/dashboard";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export async function getDashboard() {
  try {
    const { data } = await apiServer.get<Dashboard>("dashboard");

    return data;
  } catch (e) {
    console.log(e);

    if (e instanceof AxiosError) {
      if (e.status === 401) {
        redirect("/login");
      }
    }
  }
}
