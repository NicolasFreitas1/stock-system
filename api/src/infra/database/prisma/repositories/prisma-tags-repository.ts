import { PaginationParams } from '@/core/repositories/pagination-params'
import { TagsRepository } from '@/domain/stock/application/repositories/tags-repository'
import { Tag } from '@/domain/stock/enterprise/entities/tag'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaTagMapper } from '../mappers/prisma-tag-mapper'

@Injectable()
export class PrismaTagsRepository implements TagsRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({ page }: PaginationParams): Promise<Tag[]> {
    const tags = await this.prisma.tag.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })

    return tags.map(PrismaTagMapper.toDomain)
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await this.prisma.tag.findUnique({
      where: {
        id,
      },
    })

    if (!tag) {
      return null
    }

    return PrismaTagMapper.toDomain(tag)
  }

  async findByName(name: string): Promise<Tag | null> {
    const tag = await this.prisma.tag.findUnique({
      where: {
        name,
      },
    })

    if (!tag) {
      return null
    }

    return PrismaTagMapper.toDomain(tag)
  }

  async create(tag: Tag): Promise<void> {
    const data = PrismaTagMapper.toPrisma(tag)

    await this.prisma.tag.create({ data })
  }

  async save(tag: Tag): Promise<void> {
    const data = PrismaTagMapper.toPrisma(tag)

    await this.prisma.tag.update({ where: { id: data.id }, data })
  }

  async delete(tag: Tag): Promise<void> {
    const data = PrismaTagMapper.toPrisma(tag)

    await this.prisma.tag.delete({ where: { id: data.id } })
  }
}
