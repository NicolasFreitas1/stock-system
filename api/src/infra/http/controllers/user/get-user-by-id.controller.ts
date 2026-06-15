import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetUserByIdUseCase } from '@/domain/stock/application/use-cases/user/get-user-by-id'
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserPresenter } from '../../presenters/user-presenter'

@ApiTags('User')
@ApiBearerAuth()
@Controller('user/:id')
export class GetUserByIdController {
  constructor(private getUserByIdUseCase: GetUserByIdUseCase) {}

  @Get()
  async handle(@Param('id', ParseUUIDPipe) userId: string) {
    const response = await this.getUserByIdUseCase.execute({ userId })

    if (response.isLeft()) {
      const error = response.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new Error(error.message)
      }
    }

    const user = response.value.user

    return UserPresenter.toHTTP(user)
  }
}
