"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { SalePerProductName } from "@/app/_types/sale-per-product-with-product-name";

const chartConfig = {
  totalSales: {
    label: "Vendas",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

interface SalesPerProductBarChart {
  salesPerProduct: SalePerProductName[];
}

export function SalesPerProductBarChart({
  salesPerProduct,
}: SalesPerProductBarChart) {
  const chartData: SalePerProductName[] = salesPerProduct;

  return (
    <Card className="flex flex-col p-6">
      <CardHeader className="flex-1 pb-0">
        <CardTitle>Total de vendas por produto</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="productName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="totalSales"
              fill="var(--color-totalSales)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
