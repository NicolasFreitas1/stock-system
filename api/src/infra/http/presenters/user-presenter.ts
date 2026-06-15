import { User } from '@/domain/stock/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      login: user.login,
      isAdmin: user.isAdmin,
    }
  }
}
