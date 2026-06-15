import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ProductWithTags } from '@/domain/stock/enterprise/entities/value-objects/product-with-tags'
import {
  Product as PrismaProduct,
  ProductTag as PrismaProductTag,
  Tag as PrismaTag,
} from '@prisma/client'

type PrismaProductTagWithTag = PrismaProductTag & {
  tag: PrismaTag
}

type PrismaProductWithTags = PrismaProduct & {
  productTags: PrismaProductTagWithTag[]
}

export class PrismaProductWithTagsMapper {
  static toDomain(raw: PrismaProductWithTags): ProductWithTags {
    return ProductWithTags.create({
      productId: new UniqueEntityId(raw.id),
      barcode: raw.barcode,
      createdAt: raw.createdAt,
      name: raw.name,
      quantity: raw.quantity,
      value: raw.value,
      tags: raw.productTags.map((productTag) => productTag.tag.name),
    })
  }
}
