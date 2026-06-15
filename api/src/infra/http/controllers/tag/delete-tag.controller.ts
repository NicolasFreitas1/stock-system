import { DeleteTagUseCase } from '@/domain/stock/application/use-cases/tag/delete-tag'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Tag')
@ApiBearerAuth()
@Controller('tag/:id')
export class DeleteTagController {
  constructor(private deleteTag: DeleteTagUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id', ParseUUIDPipe) tagId: string) {
    const result = await this.deleteTag.execute({
      tagId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
