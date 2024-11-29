import NextAuth from "next-auth";

// Estendendo os tipos padrão de NextAuth
declare module "next-auth" {
  interface User {
    isAdmin: boolean; // Adiciona a propriedade isAdmin
  }

  interface Session {
    user: User; // Inclui a propriedade isAdmin na sessão
  }

  interface JWT {
    isAdmin: boolean; // Adiciona isAdmin no token JWT
  }
}
