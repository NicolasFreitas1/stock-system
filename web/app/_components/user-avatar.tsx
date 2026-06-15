

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export async function UserAvatar() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <p>{session.user?.name}</p>;
}
