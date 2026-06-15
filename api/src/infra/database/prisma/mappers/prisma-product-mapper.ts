import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Product } from '@/domain/stock/enterprise/entities/product'
import { Prisma, Product as PrismaProduct } from '@prisma/client'

export class PrismaProductMapper {
  static toDomain(raw: PrismaProduct): Product {
    return Product.create(
      {
        name: raw.name,
        barcode: raw.barcode,
        quantity: raw.quantity,
        value: raw.value,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      name: product.name,
      barcode: product.barcode,
      createdAt: product.createdAt,
      quantity: product.quantity,
      value: product.value,
    }
  }
}
