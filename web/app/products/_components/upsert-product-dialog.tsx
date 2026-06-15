import { MoneyInput } from "@/app/_components/money-input";
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
import { PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { upsertProduct } from "../_actions/upsert-product";
import { toast } from "sonner";

interface UpsertProductDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  productId?: string;
  defaultValues?: FormSchema;
}

const formSchema = z.object({
  name: z.string({ message: "O nome é obrigatório." }).trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  quantity: z
    .number()
    .min(1)
    .positive({ message: "A quantidade deve ser positiva" }),
  // .string({
  //   required_error: "A quantidade é obrigatória.",
  // })
  // .transform(Number)
  // .pipe(
  //   z.number().min(1).positive({ message: "A quantidade deve ser positiva" })
  // ),
  value: z
    .number({
      required_error: "O valor é obrigatório.",
    })
    .positive({ message: "O valor deve ser positivo" }),
  barcode: z
    .string({ message: "O código de barras é obrigatório." })
    .trim()
    .min(1, {
      message: "O código de barras é obrigatório.",
    }),
  tagNames: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

export function UpsertProductDialog({
  isOpen,
  setIsOpen,
  defaultValues,
  productId,
}: UpsertProductDialogProps) {
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[]>(defaultValues?.tagNames || []);

  const onSubmit = async (data: FormSchema) => {
    try {
      const formData = { ...data, tagNames: tags };

      console.log("🚀 ~ onSubmit ~ formData:", formData);

      await upsertProduct({ ...formData, id: productId });
      setIsOpen(false);
      form.reset();
      setTags([]);

      toast.success("Produto adicionado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Algo inesperado aconteceu!");
    }
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      barcode: "",
      name: "",
      quantity: 0,
      tagNames: [],
      value: 0,
    },
  });

  const isUpdate = Boolean(productId);

  useEffect(() => {
    form.reset(defaultValues);
    setTags(defaultValues?.tagNames ?? []);
  }, [defaultValues, form]);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags((prev) => [...prev, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);

        if (!open) {
          form.reset();
          setTags([]);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Atualizar" : "Adicionar"} produto
          </DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do produto" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor..."
                      onValueChange={({ floatValue }) => {
                        field.onChange(floatValue);
                      }}
                      value={field.value}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>

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
                      {...field}
                      type="number"
                      min={0}
                      placeholder="Digite a quantidade do produto"
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
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de barras</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o código de barras do produto"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Tags</FormLabel>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Digite uma tag..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" size="icon" onClick={handleAddTag}>
                  <PlusCircleIcon />
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-1 px-2 py-1">
                    <span className="text-muted-foreground ">{tag}</span>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

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
