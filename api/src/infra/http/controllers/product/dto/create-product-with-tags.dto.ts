import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

const createProductWithTagsBodySchema = z.object({
  name: z.string().min(1).max(250),
  quantity: z.number(),
  value: z.number(),
  barcode: z.string().min(1),
  tagNames: z.array(z.string()),
})

export type CreateProductWithTagsBodySchema = z.infer<
  typeof createProductWithTagsBodySchema
>

export const bodyValidationPipe = new ZodValidationPipe(
  createProductWithTagsBodySchema,
)

export class CreateProductWithTagsDTO
  implements CreateProductWithTagsBodySchema
{
  @ApiProperty()
  name: string

  @ApiProperty()
  barcode: string

  @ApiProperty()
  quantity: number

  @ApiProperty()
  value: number

  @ApiProperty()
  tagNames: string[]
}
