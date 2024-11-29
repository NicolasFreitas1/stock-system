import { apiClient } from "@/app/_lib/axios";
import { LoginResponse } from "@/app/_types/login-response";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          const response = await apiClient.post<LoginResponse>("sessions", {
            login: credentials.login,
            password: credentials.password,
          });

          const { access_token, user } = response.data;

          cookies().set("jwt", access_token);

          return {
            id: user.id,
            name: user.name,
            isAdmin: user.isAdmin,
          };
        } catch (error) {
          console.log(error);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Adiciona o campo isAdmin na sessão
      session.user = {
        ...session.user,
        isAdmin: token.isAdmin as boolean, // Adiciona isAdmin ao user da sessão
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin; // Adiciona isAdmin
      }
      console.log("JWT Token:", token); // Depuração
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
