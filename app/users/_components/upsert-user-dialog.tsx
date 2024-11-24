import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { upsertUser } from "../_actions/upsert-user";
import { toast } from "sonner";

interface UpsertUserDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userId?: string;
  defaultValues?: FormSchema;
}

const formSchema = z.object({
  name: z.string({ message: "O nome é obrigatório." }).trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  login: z.string({ message: "O login é obrigatório." }).trim().min(1, {
    message: "O login é obrigatório.",
  }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

type FormSchema = z.infer<typeof formSchema>;

export function UpsertUserDialog({
  isOpen,
  setIsOpen,
  defaultValues,
  userId,
}: UpsertUserDialogProps) {
  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertUser({ ...data, id: userId });
      setIsOpen(false);
      form.reset();

      toast.success(`Usuário ${userId ? "atualizado" : "adicionado"} com sucesso`);
    } catch (error) {
      console.log(error);
      toast.error("Algo inesperado aconteceu!");
    }
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      login: "",
      password: "",
    },
  });

  const isUpdate = Boolean(userId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Atualizar" : "Adicionar"} usuário</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o login" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite a senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">{isUpdate ? "Atualizar" : "Adicionar"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
