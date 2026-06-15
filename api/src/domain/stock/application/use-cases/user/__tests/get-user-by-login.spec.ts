import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { GetUserByLoginUseCase } from '../get-user-by-login'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserByLoginUseCase

describe('Get User by Login', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new GetUserByLoginUseCase(inMemoryUsersRepository)
  })

  it('should be able to get an user by login', async () => {
    const user = makeUser(
      { login: 'jhon.doe', name: 'Jhon Doe' },
      new UniqueEntityId('1'),
    )

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      userLogin: 'jhon.doe',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.user.name).toEqual('Jhon Doe')
    }
  })
})
