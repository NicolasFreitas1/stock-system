import { SalePerProduct } from '@/domain/stock/enterprise/entities/value-objects/sale-per-product'

export class SalePerProductPresenter {
  static toHTTP(salePerProduct: SalePerProduct) {
    return {
      productId: salePerProduct.productId.toString(),
      totalSales: salePerProduct.totalSales,
    }
  }
}
