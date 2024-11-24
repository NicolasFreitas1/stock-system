import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { deleteUser } from "../_actions/delete-user";

interface DeleteUserButtonProps {
  userId: string;
}

export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  async function handleConfirmDeleteClick() {
    try {
      await deleteUser({ userId });
      toast.success("Usuário deletado com sucesso");
    } catch (error) {
      toast.error("Ocorreu um erro ao deletar o usuário");
      console.log(error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você deseja realmente deletar este usuário?</AlertDialogTitle>
          <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
