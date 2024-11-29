"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import { Input } from "../_components/ui/input";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  login: z.string({ message: "O Login é obrigatório." }).trim().min(1, {
    message: "O Login é obrigatório.",
  }),
  password: z.string({ message: "A senha é obrigatório." }).trim().min(1, {
    message: "A senha é obrigatório.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();

  async function onSubmit(data: FormSchema) {
    console.log(data);
    try {
      signIn("credentials", {
        ...data,
        callbackUrl: "/",
      });

      toast.success("Login realizado com sucesso");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao realizar login");
    }
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.reset();
  }, [form]);

  return (
    <div className="grid h-full grid-cols-2">
      {/* ESQUERDA */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        {/* <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="Finance AI"
          className="mb-8"
        /> */}
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="text-muted-foreground mb-8">
          O Stock System é uma plataforma inovadora de gestão de estoque,
          projetada para otimizar o controle e facilitar a administração do seu
          inventário.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu login" {...field} />
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
                    <Input
                      placeholder="Digite sua senha"
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              <LogInIcon className="mr-2" />
              Fazer login
            </Button>
          </form>
        </Form>
      </div>
      {/* DIREITA */}
      <div className="relative h-full w-full">
        {/* <Image
          src="/login.jpg"
          alt="Faça login"
          fill
          className="object-cover"
        /> */}
      </div>
    </div>
  );
}
