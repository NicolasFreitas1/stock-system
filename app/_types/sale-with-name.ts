import { PaymentMethod } from "../_constants/sale";

export interface SaleWithNames {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  soldAt: string;
  value: number;
  sellerId: string;
  sellerName: string;
  paymentMethod: PaymentMethod;
}

