import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { User } from '@/domain/stock/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { HashComparer } from '../../cryptography/hash-comparer'
import { HashGenerator } from '../../cryptography/hash-generator'
import { UsersRepository } from '../../repositories/users-repository'
import { WrongCredentialsError } from '../__errors/wrong-credentials-error'

interface EditUserPasswordUseCaseRequest {
  userId: string
  newPassword: string
  oldPassword: string
}

type EditUserPasswordUseCaseResponse = Either<
  ResourceNotFoundError | WrongCredentialsError,
  {
    user: User
  }
>

@Injectable()
export class EditUserPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    newPassword,
    oldPassword,
    userId,
  }: EditUserPasswordUseCaseRequest): Promise<EditUserPasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      oldPassword,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    user.password = await this.hashGenerator.hash(newPassword)

    await this.usersRepository.save(user)

    return right({ user })
  }
}
