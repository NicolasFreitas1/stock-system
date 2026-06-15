import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

const createProductBodySchema = z.object({
  name: z.string().min(1).max(250),
  quantity: z.number(),
  value: z.number(),
  barcode: z.string().min(1),
})

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema)

export class CreateProductDTO implements CreateProductBodySchema {
  @ApiProperty()
  name: string

  @ApiProperty()
  barcode: string

  @ApiProperty()
  quantity: number

  @ApiProperty()
  value: number
}
