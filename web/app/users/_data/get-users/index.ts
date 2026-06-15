"use server";

import { apiServer } from "@/app/_lib/axios";
import { User } from "@/app/_types/user";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export async function getUsers() {
  try {
    const { data } = await apiServer.get<User[]>("/user");
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
