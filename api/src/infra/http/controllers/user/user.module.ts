import { AuthenticateUserUseCase } from '@/domain/stock/application/use-cases/user/authenticate-user'
import { CreateUserUseCase } from '@/domain/stock/application/use-cases/user/create-user'
import { DeleteUserUseCase } from '@/domain/stock/application/use-cases/user/delete-user'
import { EditUserUseCase } from '@/domain/stock/application/use-cases/user/edit-user'
import { GetUserByIdUseCase } from '@/domain/stock/application/use-cases/user/get-user-by-id'
import { ListUsersUseCase } from '@/domain/stock/application/use-cases/user/list-users'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { AuthenticateUserController } from './authenticate-user.controller'
import { CreateUserController } from './create-user.controller'
import { DeleteUserController } from './delete-user.controller'
import { EditUserController } from './edit-user.controller'
import { GetUserByIdController } from './get-user-by-id.controller'
import { ListUsersController } from './list-users.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateUserController,
    CreateUserController,
    ListUsersController,
    GetUserByIdController,
    EditUserController,
    DeleteUserController,
  ],
  providers: [
    AuthenticateUserUseCase,
    CreateUserUseCase,
    ListUsersUseCase,
    GetUserByIdUseCase,
    EditUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
