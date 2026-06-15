import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

const editUserBodySchema = z.object({
  name: z.string().min(1).max(250),
  login: z.string().min(1).max(150),
  password: z.string(),
})

type EditUserBodySchema = z.infer<typeof editUserBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(editUserBodySchema)

export class EditUserDTO implements EditUserBodySchema {
  @ApiProperty()
  login: string

  @ApiProperty()
  name: string

  @ApiProperty()
  password: string
}
