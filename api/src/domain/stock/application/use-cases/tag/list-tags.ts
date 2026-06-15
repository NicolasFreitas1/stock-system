import { Either, right } from '@/core/either'
import { Tag } from '@/domain/stock/enterprise/entities/tag'
import { Injectable } from '@nestjs/common'
import { TagsRepository } from '../../repositories/tags-repository'

interface ListTagsUseCaseRequest {
  page: number
}

type ListTagsUseCaseResponse = Either<
  null,
  {
    tags: Tag[]
  }
>

@Injectable()
export class ListTagsUseCase {
  constructor(private tagsRepository: TagsRepository) {}

  async execute({
    page,
  }: ListTagsUseCaseRequest): Promise<ListTagsUseCaseResponse> {
    const tags = await this.tagsRepository.findMany({ page })

    return right({
      tags,
    })
  }
}
