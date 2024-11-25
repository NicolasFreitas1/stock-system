"use client";

import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { deleteSale } from "../_actions/delete-sale";

interface DeleteSaleButtonProps {
  saleId: string;
}

export default function DeleteSaleButton({ saleId }: DeleteSaleButtonProps) {
  const handleDelete = async () => {
    try {
      await deleteSale(saleId);
      toast.success("Venda excluída com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir a venda.");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground"
      onClick={handleDelete}
    >
      <TrashIcon />
    </Button>
  );
}
