import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ProductTag } from '@/domain/stock/enterprise/entities/product-tag'
import { Prisma, ProductTag as PrismaProductTag } from '@prisma/client'

export class PrismaProductTagMapper {
  static toDomain(raw: PrismaProductTag): ProductTag {
    return ProductTag.create(
      {
        productId: new UniqueEntityId(raw.productId),
        tagId: new UniqueEntityId(raw.tagId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    productTag: ProductTag,
  ): Prisma.ProductTagUncheckedCreateInput {
    return {
      id: productTag.id.toString(),
      productId: productTag.productId.toString(),
      tagId: productTag.tagId.toString(),
    }
  }
}
