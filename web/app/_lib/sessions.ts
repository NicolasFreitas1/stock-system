import "server-only";
import { cookies } from "next/headers";

export async function createSession(accessToken: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  (await cookies()).set("session", accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
