import { EditTagUseCase } from '@/domain/stock/application/use-cases/tag/edit-tag'
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
import { bodyValidationPipe, EditTagDTO } from './dto/edit-tag.dto'

@ApiTags('Tag')
@ApiBearerAuth()
@Controller('/tag/:id')
export class EditTagController {
  constructor(private editTag: EditTagUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditTagDTO,
    @Param('id', ParseUUIDPipe) tagId: string,
  ) {
    const { name } = body

    const result = await this.editTag.execute({
      tagId,
      name,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
