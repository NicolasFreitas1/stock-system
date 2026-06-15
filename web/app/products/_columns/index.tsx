"use client";

import { Badge } from "@/app/_components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { Product } from "@/app/_types/product";
import { ColumnDef } from "@tanstack/react-table";
import EditProductButton from "../_components/edit-product-button";
import DeleteProductButton from "../_components/delete-product-button";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row: { original: product } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.value)),
  },
  {
    accessorKey: "createdAt",
    header: "Data de criação",
    cell: ({ row: { original: product } }) =>
      new Date(product.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row: { original: product } }) => {
      const displayedTags = product.tags.slice(0, 3); // Mostra as primeiras 3 tags
      const remainingTags = product.tags.slice(3); // Armazena as tags restantes

      return (
        <div className="flex gap-1 items-center">
          {displayedTags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
          {remainingTags.length > 0 && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-sm text-gray-500">
                    +{remainingTags.length}
                  </TooltipTrigger>
                  <TooltipContent>
                    {remainingTags.map((tag) => {
                      return (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      );
                    })}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: product } }) => {
      return (
        <div className="space-x-1">
          <EditProductButton product={product} />
          <DeleteProductButton productId={product.id} />
        </div>
      );
    },
  },
];
