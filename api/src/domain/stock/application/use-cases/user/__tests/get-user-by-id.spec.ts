import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { GetUserByIdUseCase } from '../get-user-by-id'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserByIdUseCase

describe('Get User by Id', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new GetUserByIdUseCase(inMemoryUsersRepository)
  })

  it('should be able to get an user by id', async () => {
    const user = makeUser({ name: 'Jhon Doe' }, new UniqueEntityId('1'))

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      userId: '1',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.user.name).toEqual('Jhon Doe')
    }
  })
})
