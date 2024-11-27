import { getServerSession } from "next-auth";
import Navbar from "../_components/navbar";
import { DataTable } from "../_components/ui/data-table";
import { ScrollArea } from "../_components/ui/scroll-area";
import { getSales } from "./_data/get-sales";
import { redirect } from "next/navigation";
import { saleColumns } from "./_columns";
import { AddSaleButton } from "./_components/add-sale-button";

export default async function UsersPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const users = await getSales();

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Vendas</h1>
          <AddSaleButton />
        </div>

        <ScrollArea className="h-full">
          <DataTable columns={saleColumns} data={users ?? []} />
        </ScrollArea>
      </div>
    </>
  );
}
