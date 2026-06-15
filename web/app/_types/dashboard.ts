import { Product } from "./product";
import { SalePerProductName } from "./sale-per-product-with-product-name";
import { SalesBySellerName } from "./sales-by-seller-name";
import { StockMetrics } from "./stock-metrics";

export interface Dashboard {
  salesPerProduct: SalePerProductName[];
  salesBySeller: SalesBySellerName[];
  stockMetrics: StockMetrics;
  lowQuantityProducts: Product[];
}
