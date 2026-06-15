import { PaginationParams } from '@/core/repositories/pagination-params'
import { UsersRepository } from '@/domain/stock/application/repositories/users-repository'
import { User } from '@/domain/stock/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({ page }: PaginationParams): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })

    return users.map(PrismaUserMapper.toDomain)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({ data })
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.update({ where: { id: data.id }, data })
  }

  async delete(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.delete({ where: { id: data.id } })
  }
}
