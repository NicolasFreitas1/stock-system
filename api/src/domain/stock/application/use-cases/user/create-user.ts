import { Either, left, right } from '@/core/either'
import { User } from '@/domain/stock/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'
import { UserAlreadyExistsError } from '../__errors/user-already-exists-error'
import { HashGenerator } from '../../cryptography/hash-generator'

interface CreateUserUseCaseRequest {
  login: string
  name: string
  password: string
}

type CreateUserUseCaseResponse = Either<UserAlreadyExistsError, { user: User }>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    login,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByLogin(login)

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError(login))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      login,
      name,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    return right({ user })
  }
}
