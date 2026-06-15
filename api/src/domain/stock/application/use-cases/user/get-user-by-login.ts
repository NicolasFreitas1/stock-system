import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { User } from '@/domain/stock/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'

interface GetUserByLoginUseCaseRequest {
  userLogin: string
}

type GetUserByLoginUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class GetUserByLoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userLogin,
  }: GetUserByLoginUseCaseRequest): Promise<GetUserByLoginUseCaseResponse> {
    const user = await this.usersRepository.findByLogin(userLogin)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({ user })
  }
}
