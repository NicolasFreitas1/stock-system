import { Either, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { TagsRepository } from '../../repositories/tags-repository'

interface DeleteTagUseCaseRequest {
  tagId: string
}

type DeleteTagUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteTagUseCase {
  constructor(private tagsRepository: TagsRepository) {}

  async execute({
    tagId,
  }: DeleteTagUseCaseRequest): Promise<DeleteTagUseCaseResponse> {
    const tag = await this.tagsRepository.findById(tagId)

    if (!tag) {
      throw new ResourceNotFoundError()
    }

    await this.tagsRepository.delete(tag)

    return right(null)
  }
}
