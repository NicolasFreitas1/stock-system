import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

const authenticateUserBodySchema = z.object({
  login: z.string().min(1).max(150),
  password: z.string(),
})

type AuthenticateUserBodySchema = z.infer<typeof authenticateUserBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(
  authenticateUserBodySchema,
)

export class AuthenticateUserDTO implements AuthenticateUserBodySchema {
  @ApiProperty()
  login: string

  @ApiProperty()
  password: string
}
