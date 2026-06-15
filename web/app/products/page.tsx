import { getServerSession } from "next-auth";
import Navbar from "../_components/navbar";
import { DataTable } from "../_components/ui/data-table";
import { ScrollArea } from "../_components/ui/scroll-area";
import { getProducts } from "./_data/get-products";
import { redirect } from "next/navigation";
import { productColumns } from "./_columns";
import { AddProductButton } from "./_components/add-product-button";

export default async function ProductsPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const products = await getProducts();

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        {/* TITULO E BOTAO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Produtos</h1>
          {/* Botão de adicionar produtos  */}
          <AddProductButton />
        </div>

        <ScrollArea className="h-full">
          <DataTable columns={productColumns} data={products ?? []} />
        </ScrollArea>
      </div>
    </>
  );
}
