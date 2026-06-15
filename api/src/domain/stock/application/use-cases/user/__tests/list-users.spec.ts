import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { ListUsersUseCase } from '../list-users'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: ListUsersUseCase

describe('List Recent Users', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new ListUsersUseCase(inMemoryUsersRepository)
  })

  it('should be able to list  users', async () => {
    await inMemoryUsersRepository.create(makeUser({ name: 'user-03' }))
    await inMemoryUsersRepository.create(makeUser({ name: 'user-02' }))
    await inMemoryUsersRepository.create(makeUser({ name: 'user-01' }))

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.users).toEqual([
      expect.objectContaining({ name: 'user-03' }),
      expect.objectContaining({ name: 'user-02' }),
      expect.objectContaining({ name: 'user-01' }),
    ])
  })

  it('should be able to list paginated recent users', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryUsersRepository.create(makeUser())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.users).toHaveLength(2)
  })
})
