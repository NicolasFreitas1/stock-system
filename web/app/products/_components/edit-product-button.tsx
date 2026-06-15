"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@/app/_types/product";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { UpsertProductDialog } from "./upsert-product-dialog";

interface EditProductButtonProps {
  product: Product;
}

export default function EditProductButton({ product }: EditProductButtonProps) {
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
      <UpsertProductDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{ ...product, tagNames: product.tags }}
        productId={product.id}
      />
    </>
  );
}
