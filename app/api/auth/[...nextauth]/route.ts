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
        login: { label: "Login", type: "text", placeholder: "jsmith" },
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
          };
        } catch (error) {
          console.log(error);

          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
