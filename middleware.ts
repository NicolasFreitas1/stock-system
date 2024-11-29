import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.isAdmin) {
    // Redireciona para a página de login ou outra página
    return new Response("Unauthorized", { status: 401 });
  }

  return NextResponse.next(); // Permite o acesso
}

// Configura o middleware apenas para a rota '/users'
export const config = {
  matcher: "/users",
};
