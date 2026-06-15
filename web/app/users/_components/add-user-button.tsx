"use client";

import { Button } from "@/app/_components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { UpsertUserDialog } from "./upsert-user-dialog";

export function AddUserButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar Usuário
        <PlusCircleIcon />
      </Button>
      <UpsertUserDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
}
