import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Sale } from '@/domain/stock/enterprise/entities/sale'
import { Prisma, Sale as PrismaSale } from '@prisma/client'

export class PrismaSaleMapper {
  static toDomain(raw: PrismaSale): Sale {
    return Sale.create(
      {
        productId: new UniqueEntityId(raw.productId),
        quantity: raw.quantity,
        sellerId: new UniqueEntityId(raw.sellerId),
        value: raw.value,
        paymentMethod: raw.paymentMethod,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(sale: Sale): Prisma.SaleUncheckedCreateInput {
    return {
      id: sale.id.toString(),
      productId: sale.productId.toString(),
      quantity: sale.quantity,
      sellerId: sale.sellerId.toString(),
      value: sale.value,
      soldAt: sale.soldAt,
      paymentMethod: sale.paymentMethod,
    }
  }
}
