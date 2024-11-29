"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserSession } from "../_action/get-user-session";
import LogOut from "./log-out";

export default function Navbar() {
  const [userSession, setUserSession] = useState<
    | {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        isAdmin?: boolean | null;
      }
    | undefined
  >(undefined);

  const pathname = usePathname();

  async function getServerUserSession() {
    const serverUserSession = await getUserSession();

    console.log(serverUserSession);

    setUserSession(serverUserSession);
  }

  useEffect(() => {
    getServerUserSession();

    console.log(userSession);
  }, [userSession]);

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        {/* <Image src="" width={173} height={39} alt="Logo " /> */}
        <Link
          href="/"
          className={
            pathname === "/"
              ? "text-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/sales"
          className={
            pathname === "/sales"
              ? "text-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Vendas
        </Link>
        <Link
          href="/products"
          className={
            pathname === "/products"
              ? "text-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Produtos
        </Link>

        <Link
          href="/users"
          className={
            pathname === "/users"
              ? "text-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Usuários
        </Link>
      </div>
      <LogOut />
    </nav>
  );
}
