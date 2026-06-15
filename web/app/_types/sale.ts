import { PaymentMethod } from "../_constants/sale";

export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  value: number;
  soldAt: string;
  sellerId: string;
  paymentMethod: PaymentMethod;
}
