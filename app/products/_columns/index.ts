"use client";

import { Product } from "@/app/_types/product";
import { ColumnDef } from "@tanstack/react-table";

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
];
