import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/stock/enterprise/entities/user'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      login: faker.internet.userName(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return user
}
