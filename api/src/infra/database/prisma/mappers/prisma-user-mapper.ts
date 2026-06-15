import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/stock/enterprise/entities/user'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        login: raw.login,
        password: raw.password,
        isAdmin: raw.isAdmin,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      login: user.login,
      password: user.password,
      isAdmin: user.isAdmin,
    }
  }
}
