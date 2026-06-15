import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

const createUserBodySchema = z.object({
  name: z.string().min(1).max(250),
  login: z.string().min(1).max(150),
  password: z.string(),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

export class CreateUserDTO implements CreateUserBodySchema {
  @ApiProperty()
  login: string

  @ApiProperty()
  name: string

  @ApiProperty()
  password: string
}
