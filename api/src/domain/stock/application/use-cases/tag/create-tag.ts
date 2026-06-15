import { Injectable } from '@nestjs/common'
import { TagsRepository } from '../../repositories/tags-repository'
import { Either, left, right } from '@/core/either'
import { NameAlreadyInUseError } from '../__errors/name-already-in-use-error'
import { Tag } from '@/domain/stock/enterprise/entities/tag'

interface CreateTagUseCaseRequest {
  name: string
}

type CreateTagUseCaseResponse = Either<NameAlreadyInUseError, { tag: Tag }>

@Injectable()
export class CreateTagUseCase {
  constructor(private tagsRepository: TagsRepository) {}

  async execute({
    name,
  }: CreateTagUseCaseRequest): Promise<CreateTagUseCaseResponse> {
    const tagAlreadyExists = await this.tagsRepository.findByName(name)

    if (tagAlreadyExists) {
      return left(new NameAlreadyInUseError(name))
    }

    const tag = Tag.create({ name })

    await this.tagsRepository.create(tag)

    return right({ tag })
  }
}
