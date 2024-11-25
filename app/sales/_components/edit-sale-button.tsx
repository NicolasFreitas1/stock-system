"use client";

import { Button } from "@/app/_components/ui/button";
import { Sale } from "@/app/_types/sale";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { UpsertSaleDialog } from "./upsert-sale-dialog";

interface EditSaleButtonProps {
  sale: Sale;
}

export default function EditSaleButton({ sale }: EditSaleButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertSaleDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{ ...sale, soldAt: new Date(sale.soldAt) }}
        saleId={sale.id}
      />
    </>
  );
}
