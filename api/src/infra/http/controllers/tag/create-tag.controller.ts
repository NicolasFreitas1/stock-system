import { NameAlreadyInUseError } from '@/domain/stock/application/use-cases/__errors/name-already-in-use-error'
import { CreateTagUseCase } from '@/domain/stock/application/use-cases/tag/create-tag'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateTagDTO, bodyValidationPipe } from './dto/create-tag.dto'

@ApiTags('Tag')
@ApiBearerAuth()
@Controller('/tag')
export class CreateTagController {
  constructor(private createTagUseCase: CreateTagUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateTagDTO) {
    const { name } = body

    const result = await this.createTagUseCase.execute({
      name,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case NameAlreadyInUseError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
