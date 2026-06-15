import { Product } from '@/domain/stock/enterprise/entities/product'
import { SalePerProduct } from '@/domain/stock/enterprise/entities/value-objects/sale-per-product'
import { SalesBySeller } from '@/domain/stock/enterprise/entities/value-objects/sales-by-seller'
import { StockMetrics } from '@/domain/stock/enterprise/entities/value-objects/stock-metrics'
import { SalePerProductPresenter } from './sale-per-product-presenter'
import { SalesBySellerPresenter } from './sale-by-seller-presenter'
import { StockMetricsPresenter } from './stock-metrics-presenter'
import { ProductPresenter } from './product-presenter'

export interface DashboardPresenterRequest {
  salesPerProduct: SalePerProduct[]
  salesBySeller: SalesBySeller[]
  stockMetrics: StockMetrics
  lowQuantityProducts: Product[]
}

export class DashboardPresenter {
  static toHTTP(dashboard: DashboardPresenterRequest) {
    return {
      salesPerProduct: dashboard.salesPerProduct.map(
        SalePerProductPresenter.toHTTP,
      ),
      salesBySeller: dashboard.salesBySeller.map(SalesBySellerPresenter.toHTTP),
      stockMetrics: StockMetricsPresenter.toHTTP(dashboard.stockMetrics),
      lowQuantityProducts: dashboard.lowQuantityProducts.map(
        ProductPresenter.toHTTP,
      ),
    }
  }
}
