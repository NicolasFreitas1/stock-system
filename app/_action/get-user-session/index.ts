"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getUserSession() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.user) {
    redirect("/login");
  }

  console.log(session);

  return session.user;
}
