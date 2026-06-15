import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ListTagsUseCase } from '@/domain/stock/application/use-cases/tag/list-tags'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { TagPresenter } from '../../presenters/tag-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type pageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@ApiTags('Tag')
@ApiBearerAuth()
@Controller('/tag')
export class ListTagsController {
  constructor(private listTagsUseCase: ListTagsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: pageQueryParamSchema) {
    const result = await this.listTagsUseCase.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const tags = result.value.tags

    return tags.map(TagPresenter.toHTTP)
  }
}
