import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Product } from "@/app/_types/product";
import Link from "next/link";

interface LowStockProductsProps {
  lowStockProducts: Product[];
}

export function LowStockProducts({ lowStockProducts }: LowStockProductsProps) {
  function getQuantityColor(product: Product) {
    if (product.quantity <= 10 && product.quantity >= 5) {
      return "text-yellow-500";
    }

    if (product.quantity < 5 && product.quantity >= 0) {
      return "text-red-500";
    }
    return "text-white";
  }

  // VER PARA TRANSFORMAR EM TABELA, COM UM PONTINHO PARA SER O "STATUS" DO ITEM
  return (
    <ScrollArea className="rounded-md border h-full">
      <CardHeader className="flex-row items-center justify-between border-b-2">
        <CardTitle className="font-bold">
          Produtos com baixa quantidade
        </CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/products">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6 mt-1">
        <ul className="flex flex-col gap-3 p-3">
          {lowStockProducts.length > 0 ? (
            lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <li className="list-disc items-center">
                    <p className="text-sm font-bold ">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Adicionado em:{" "}
                      {new Date(product.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </li>
                </div>
                <div>
                  <p
                    className={`text-sm font-bold ${getQuantityColor(
                      product
                    )} ${product.quantity === 0 && "line-through"}`}
                  >
                    {product.quantity === 0
                      ? "Esgotado"
                      : `Quantidade: ${product.quantity} `}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <li className="list-disc items-center">
                  <p className="text-sm font-bold ">Nenhum produto em falta</p>
                </li>
              </div>
            </div>
          )}
        </ul>
      </CardContent>
    </ScrollArea>
  );
}
