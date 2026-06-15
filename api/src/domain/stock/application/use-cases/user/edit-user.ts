import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { User } from '@/domain/stock/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'
import { HashGenerator } from '../../cryptography/hash-generator'

interface EditUserUseCaseRequest {
  userId: string
  name: string
  login: string
}

type EditUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class EditUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    login,
    name,
    userId,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.name = name
    user.login = login

    await this.usersRepository.save(user)

    return right({ user })
  }
}
