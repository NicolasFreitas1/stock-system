import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetTagByIdUseCase } from '@/domain/stock/application/use-cases/tag/get-tag-by-id'
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { TagPresenter } from '../../presenters/tag-presenter'

@ApiTags('Tag')
@ApiBearerAuth()
@Controller('tag/:id')
export class GetTagByIdController {
  constructor(private getTagByIdUseCase: GetTagByIdUseCase) {}

  @Get()
  async handle(@Param('id', ParseUUIDPipe) tagId: string) {
    const response = await this.getTagByIdUseCase.execute({ tagId })

    if (response.isLeft()) {
      const error = response.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new Error(error.message)
      }
    }

    const tag = response.value.tag

    return TagPresenter.toHTTP(tag)
  }
}
