import { ProductWithTags } from '@/domain/stock/enterprise/entities/value-objects/product-with-tags'

export class ProductWithTagsPresenter {
  static toHTTP(product: ProductWithTags) {
    return {
      id: product.productId.toString(),
      name: product.name,
      quantity: product.quantity,
      value: product.value,
      barcode: product.barcode,
      createdAt: product.createdAt,
      tags: product.tags,
    }
  }
}
