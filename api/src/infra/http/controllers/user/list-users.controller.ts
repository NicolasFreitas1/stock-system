import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ListUsersUseCase } from '@/domain/stock/application/use-cases/user/list-users'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { UserPresenter } from '../../presenters/user-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type pageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@ApiTags('User')
@ApiBearerAuth()
@Controller('/user')
export class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: pageQueryParamSchema) {
    const result = await this.listUsersUseCase.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const users = result.value.users

    return users.map(UserPresenter.toHTTP)
  }
}
