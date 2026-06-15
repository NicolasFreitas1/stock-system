"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogOut() {
  return (
    <>
      <Button variant="outline" size="lg" onClick={() => signOut()}>
        Sair
      </Button>
    </>
  );
}
