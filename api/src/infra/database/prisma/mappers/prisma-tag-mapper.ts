import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Tag } from '@/domain/stock/enterprise/entities/tag'
import { Prisma, Tag as PrismaTag } from '@prisma/client'

export class PrismaTagMapper {
  static toDomain(raw: PrismaTag): Tag {
    return Tag.create(
      {
        name: raw.name,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(tag: Tag): Prisma.TagUncheckedCreateInput {
    return {
      id: tag.id.toString(),
      name: tag.name,
    }
  }
}
