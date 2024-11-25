"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { upsertSale } from "../_actions/upsert-sale";
import { toast } from "sonner";
import { DatePicker } from "@/app/_components/ui/date-picker";
import { getUsers } from "@/app/users/_data/get-users";
import { useEffect, useState } from "react";
import { User } from "@/app/_types/user";
import { Product } from "@/app/_types/product";
import { getProducts } from "@/app/products/_data/get-products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

interface UpsertSaleDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  saleId?: string;
  defaultValues?: FormSchema;
}

const formSchema = z.object({
  productId: z.string().uuid("Produto inválido."),
  quantity: z.number().int().positive("A quantidade deve ser positiva."),
  sellerId: z.string().uuid("Vendedor inválido."),
  soldAt: z.date(),
});

type FormSchema = z.infer<typeof formSchema>;

export function UpsertSaleDialog({
  isOpen,
  setIsOpen,
  saleId,
  defaultValues,
}: UpsertSaleDialogProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  async function listUsers() {
    try {
      const users = await getUsers();

      setUsers(users ?? []);
    } catch (e) {
      console.log(e);
    }
  }

  async function listProducts() {
    try {
      const products = await getProducts();

      setProducts(products ?? []);
    } catch (e) {
      console.log(e);
    }
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      productId: "",
      quantity: 1,
      sellerId: "",
      soldAt: new Date(),
    },
  });

  const isUpdate = Boolean(saleId);

  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertSale({ ...data, id: saleId });
      setIsOpen(false);
      form.reset();
      toast.success(
        `Venda ${isUpdate ? "atualizada" : "adicionada"} com sucesso!`
      );
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar a venda.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      listUsers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      listProducts();
    }
  }, [isOpen]);

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

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
          <DialogTitle>{isUpdate ? "Editar" : "Adicionar"} Venda</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produto</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o produto..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Quantidade"
                      {...field}
                      value={field.value || 0}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sellerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendedor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o vendedor..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="soldAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da venda</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
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
              <Button type="submit">
                {isUpdate ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
