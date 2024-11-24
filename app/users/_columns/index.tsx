"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/app/_types/user";
import EditUserButton from "../_components/edit-user-button";
import DeleteUserButton from "../_components/delete-user-button";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "login",
    header: "Login",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original: user } }) => {
      return (
        <div className="space-x-1">
          <EditUserButton user={user} />
          <DeleteUserButton userId={user.id} />
        </div>
      );
    },
  },
];
