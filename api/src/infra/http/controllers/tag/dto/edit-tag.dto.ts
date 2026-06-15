import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

const editTagBodySchema = z.object({
  name: z.string().min(1).max(250),
})

type EditTagBodySchema = z.infer<typeof editTagBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(editTagBodySchema)

export class EditTagDTO implements EditTagBodySchema {
  @ApiProperty()
  name: string
}
