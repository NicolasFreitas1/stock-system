import { Sale } from '@/domain/stock/enterprise/entities/sale'

export class SalePresenter {
  static toHTTP(sale: Sale) {
    return {
      id: sale.id.toString(),
      value: sale.value,
      quantity: sale.quantity,
      soldAt: sale.soldAt,
      productId: sale.productId.toString(),
      sellerId: sale.sellerId.toString(),
      paymentMethod: sale.paymentMethod,
    }
  }
}
