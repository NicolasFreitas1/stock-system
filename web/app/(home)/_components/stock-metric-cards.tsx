import { Package, TriangleAlertIcon, WalletIcon, XIcon } from "lucide-react";
import { MetricCard } from "./metric-card";

interface StockMetricCardsProps {
  revenueGenerated: number;
  totalStock: number;
  totalMissing: number;
  totalInRisk: number;
}

export function StockMetricCards({
  revenueGenerated,
  totalInRisk,
  totalMissing,
  totalStock,
}: StockMetricCardsProps) {
  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD */}

      <MetricCard
        icon={<WalletIcon size={16} />}
        title="Receita gerada"
        value={revenueGenerated}
        isCurrency
        size="large"
      />

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <MetricCard
          icon={<Package size={16} />}
          title="Produtos Catalogados"
          value={totalStock}
        />
        <MetricCard
          icon={<TriangleAlertIcon size={16} className="text-yellow-500" />}
          title="Itens com Risco de Falta"
          value={totalInRisk}
        />
        <MetricCard
          icon={<XIcon size={16} className="text-red-500" />}
          title="Itens Fora de Estoque"
          value={totalMissing}
        />
      </div>
    </div>
  );
}
