"use client";

import { Button } from "@/app/_components/ui/button";
import { User } from "@/app/_types/user";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { UpsertUserDialog } from "./upsert-user-dialog";

interface EditUserButtonProps {
  user: User;
}

export default function EditUserButton({ user }: EditUserButtonProps) {
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
      <UpsertUserDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={user ?? { name: "", login: "", password: "senhaAtualizada" }}

        userId={user.id}
      />
    </>
  );
}
