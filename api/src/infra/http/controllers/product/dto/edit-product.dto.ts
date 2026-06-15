import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

const editProductBodySchema = z.object({
  name: z.string().min(1).max(250),
  quantity: z.number(),
  value: z.number(),
  barcode: z.string().min(1),
})

type EditProductBodySchema = z.infer<typeof editProductBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(editProductBodySchema)

export class EditProductDTO implements EditProductBodySchema {
  @ApiProperty()
  name: string

  @ApiProperty()
  barcode: string

  @ApiProperty()
  quantity: number

  @ApiProperty()
  value: number
}
