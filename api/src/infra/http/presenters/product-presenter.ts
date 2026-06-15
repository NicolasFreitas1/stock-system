import { Product } from '@/domain/stock/enterprise/entities/product'

export class ProductPresenter {
  static toHTTP(product: Product) {
    return {
      id: product.id.toString(),
      name: product.name,
      quantity: product.quantity,
      value: product.value,
      barcode: product.barcode,
      createdAt: product.createdAt,
    }
  }
}
