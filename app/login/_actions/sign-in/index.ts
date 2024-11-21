import api from "@/app/_lib/axios";
import { SignInSchema } from "./schema";

export async function signIn({ login, password }: SignInSchema) {
  console.log(login, password);

  return await api.post("/sessions", { login, password });
}
