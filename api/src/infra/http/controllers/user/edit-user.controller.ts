import { EditUserUseCase } from '@/domain/stock/application/use-cases/user/edit-user'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { bodyValidationPipe, EditUserDTO } from './dto/edit-user.dto'

@ApiTags('User')
@ApiBearerAuth()
@Controller('/user/:id')
export class EditUserController {
  constructor(private editUser: EditUserUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditUserDTO,
    @Param('id', ParseUUIDPipe) userId: string,
  ) {
    const { login, name } = body

    const result = await this.editUser.execute({
      userId,
      login,
      name,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
