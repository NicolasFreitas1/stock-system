import { SalePerProduct } from '../../enterprise/entities/value-objects/sale-per-product'
import { SalesBySeller } from '../../enterprise/entities/value-objects/sales-by-seller'
import { StockMetrics } from '../../enterprise/entities/value-objects/stock-metrics'

export abstract class DashboardRepository {
  abstract salesPerProduct(): Promise<SalePerProduct[]>
  abstract salesBySeller(): Promise<SalesBySeller[]>
  abstract findStockMetrics(): Promise<StockMetrics>
}
