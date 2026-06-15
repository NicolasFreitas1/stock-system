import { apiClient } from "@/app/_lib/axios";
import { SignInSchema } from "./schema";

export async function signIn({ login, password }: SignInSchema) {
  return await apiClient.post("/sessions", { login, password });
}
