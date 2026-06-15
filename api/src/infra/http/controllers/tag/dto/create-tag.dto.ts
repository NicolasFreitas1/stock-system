import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

const createTagBodySchema = z.object({
  name: z.string().min(1).max(250),
})

type CreateTagBodySchema = z.infer<typeof createTagBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(createTagBodySchema)

export class CreateTagDTO implements CreateTagBodySchema {
  @ApiProperty()
  name: string
}
