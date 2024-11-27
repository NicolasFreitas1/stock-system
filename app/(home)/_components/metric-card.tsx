import { AddSaleButton } from "@/app/_components/add-sale-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface MetricCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  isCurrency?: boolean;
  size?: "small" | "large";
}

export function MetricCard({
  icon,
  isCurrency,
  title,
  value,
  size,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 ">
          {icon}
          <p
            className={`${
              size === "small"
                ? "text-muted-foreground"
                : "text-white opacity-70"
            }`}
          >
            {title}
          </p>
        </div>

        {size === "large" && <AddSaleButton />}
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
        >
          {isCurrency
            ? Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(value)
            : value}
        </p>
      </CardContent>
    </Card>
  );
}
