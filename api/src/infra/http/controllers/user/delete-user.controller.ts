import { DeleteUserUseCase } from '@/domain/stock/application/use-cases/user/delete-user'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('User')
@ApiBearerAuth()
@Controller('user/:id')
export class DeleteUserController {
  constructor(private deleteUser: DeleteUserUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id', ParseUUIDPipe) userId: string) {
    const result = await this.deleteUser.execute({
      userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
