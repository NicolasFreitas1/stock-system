import api from "@/app/_lib/axios";
import { SignInSchema } from "./schema";

export async function signIn({ login, password }: SignInSchema) {
  return await api.post("/sessions", { login, password });
}
