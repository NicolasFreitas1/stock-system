"use server";

import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { SalesBySellerName } from "@/app/_types/sales-by-seller-name";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface SalesBySellerProps {
  salesBySeller: SalesBySellerName[];
}

export async function SalesBySellerProgress({
  salesBySeller,
}: SalesBySellerProps) {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
      <CardHeader>
        <CardTitle className="font-bold">Vendas por vendedor</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {salesBySeller.map((sale) => (
          <div key={sale.sellerId} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">{sale.sellerName}</p>
              <p className="text-sm font-bold">{sale.percentageOfTotal}%</p>
            </div>
            <Progress value={sale.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
