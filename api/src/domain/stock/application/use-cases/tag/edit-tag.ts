import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { NameAlreadyInUseError } from '../__errors/name-already-in-use-error'
import { Tag } from '@/domain/stock/enterprise/entities/tag'
import { TagsRepository } from '../../repositories/tags-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditTagUseCaseRequest {
  tagId: string
  name: string
}

type EditTagUseCaseResponse = Either<
  ResourceNotFoundError | NameAlreadyInUseError,
  {
    tag: Tag
  }
>

@Injectable()
export class EditTagUseCase {
  constructor(private tagsRepository: TagsRepository) {}

  async execute({
    tagId,
    name,
  }: EditTagUseCaseRequest): Promise<EditTagUseCaseResponse> {
    const tag = await this.tagsRepository.findById(tagId)

    if (!tag) {
      return left(new ResourceNotFoundError())
    }

    const tagNameIsInUse = await this.tagsRepository.findByName(name)

    if (tagNameIsInUse) {
      return left(new NameAlreadyInUseError(name))
    }

    tag.name = name

    await this.tagsRepository.save(tag)

    return right({ tag })
  }
}
