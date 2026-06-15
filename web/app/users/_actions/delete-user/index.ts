"use server";

import { apiServer } from "@/app/_lib/axios";
import { DeleteUserSchema } from "./schema";
import { revalidatePath } from "next/cache";

export async function deleteUser({ userId }: DeleteUserSchema) {
  await apiServer.delete(`user/${userId}`);

  revalidatePath("/");
  revalidatePath("/users");
}
