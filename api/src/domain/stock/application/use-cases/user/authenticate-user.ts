import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'
import { HashComparer } from '../../cryptography/hash-comparer'
import { Encrypter } from '../../cryptography/encrypter'
import { Either, left, right } from '@/core/either'
import { WrongCredentialsError } from '../__errors/wrong-credentials-error'
import { User } from '@/domain/stock/enterprise/entities/user'

interface AuthenticateUserUseCaseRequest {
  login: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
    user: User
  }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    login,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByLogin(login)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return right({
      accessToken,
      user,
    })
  }
}
