"use client";

import { Button } from "@/app/_components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { UpsertSaleDialog } from "../sales/_components/upsert-sale-dialog";

export function AddSaleButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar Venda
        <PlusCircleIcon />
      </Button>
      <UpsertSaleDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
}
