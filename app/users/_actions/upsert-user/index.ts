import axios from "axios";

interface UpsertUserPayload {
  id?: string; // Obrigatório para edição, ausente para criação
  name: string;
  login: string;
  password: string;
}

export async function upsertUser(data: UpsertUserPayload) {
  const url = data.id
    ? `http://localhost:5001/user/${data.id}` // Atualizar usuário (PUT)
    : "http://localhost:5001/user"; // Criar usuário (POST)

  const method = data.id ? "put" : "post";

  try {
    const response = await axios({
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
