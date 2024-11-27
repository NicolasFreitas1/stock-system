"use client";

import { SaleWithNames } from "@/app/_types/sale-with-name";
import { ColumnDef } from "@tanstack/react-table";
import DeleteSaleButton from "../_components/delete-sale-button";
import EditSaleButton from "../_components/edit-sale-button";
import { PAYMENT_METHOD_LABELS } from "@/app/_constants/sale";

export const saleColumns: ColumnDef<SaleWithNames>[] = [
  {
    accessorKey: "productName",
    header: "Produto",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "soldAt",
    header: "Data da Venda",
    cell: ({ row: { original } }) => {
      return new Date(original.soldAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "value",
    header: "Valor da venda",
    cell: ({ row: { original: sale } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(sale.value)),
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    cell: ({ row: { original: sale } }) =>
      PAYMENT_METHOD_LABELS[sale.paymentMethod],
  },
  {
    accessorKey: "sellerName",
    header: "Vendedor",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original: sale } }) => (
      <div className="space-x-1">
        <EditSaleButton sale={sale} />
        <DeleteSaleButton saleId={sale.id} />
      </div>
    ),
  },
];
