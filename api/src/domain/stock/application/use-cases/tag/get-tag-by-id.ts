import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Tag } from '@/domain/stock/enterprise/entities/tag'
import { Injectable } from '@nestjs/common'
import { TagsRepository } from '../../repositories/tags-repository'

interface GetTagByIdUseCaseRequest {
  tagId: string
}

type GetTagByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    tag: Tag
  }
>

@Injectable()
export class GetTagByIdUseCase {
  constructor(private tagsRepository: TagsRepository) {}

  async execute({
    tagId,
  }: GetTagByIdUseCaseRequest): Promise<GetTagByIdUseCaseResponse> {
    const tag = await this.tagsRepository.findById(tagId)

    if (!tag) {
      return left(new ResourceNotFoundError())
    }

    return right({ tag })
  }
}
