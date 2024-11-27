import { Product } from "./product";
import { SalePerProduct } from "./sale-per-product";
import { SalesBySeller } from "./sales-by-seller";
import { StockMetrics } from "./stock-metrics";

export interface Dashboard {
  salesPerProduct: SalePerProduct[];
  salesBySeller: SalesBySeller[];
  stockMetrics: StockMetrics;
  lowQuantityProducts: Product[];
}
