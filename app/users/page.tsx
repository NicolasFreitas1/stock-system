import { getServerSession } from "next-auth";
import Navbar from "../_components/navbar";
import { DataTable } from "../_components/ui/data-table";
import { ScrollArea } from "../_components/ui/scroll-area";
import { getUsers } from "./_data/get-users";
import { redirect } from "next/navigation";
import { userColumns } from "./_columns";
import { AddUserButton } from "./_components/add-user-button";

export default async function UsersPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const users = await getUsers();

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Usuários</h1>
          <AddUserButton />
        </div>

        <ScrollArea className="h-full">
          <DataTable columns={userColumns} data={users ?? []} />
        </ScrollArea>
      </div>
    </>
  );
}
