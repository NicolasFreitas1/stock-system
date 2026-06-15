import { StockMetrics } from '@/domain/stock/enterprise/entities/value-objects/stock-metrics'

export class StockMetricsPresenter {
  static toHTTP(stockMetrics: StockMetrics) {
    return {
      revenueGenerated: stockMetrics.revenueGenerated,
      totalStock: stockMetrics.totalStock,
      totalMissing: stockMetrics.totalMissing,
      totalInRisk: stockMetrics.totalInRisk,
    }
  }
}
