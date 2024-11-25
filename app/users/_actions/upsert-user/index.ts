import { apiServer } from "@/app/_lib/axios";

interface UpsertUserPayload {
  id?: string; // Obrigatório para edição, ausente para criação
  name: string;
  login: string;
  password: string;
}

export async function upsertUser(data: UpsertUserPayload) {
  const url = data.id
    ? `/user/${data.id}` // Atualizar usuário (PUT)
    : "/user"; // Criar usuário (POST)

  const method = data.id ? "put" : "post";

  try {
    const response = await apiServer({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar usuário:", error);
    throw new Error("Erro ao salvar o usuário");
  }
}
