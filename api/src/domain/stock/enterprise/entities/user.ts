import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  name: string
  login: string
  password: string
  isAdmin: boolean
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get login() {
    return this.props.login
  }

  set login(login: string) {
    this.props.login = login
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get isAdmin() {
    return this.props.isAdmin
  }

  set isAdmin(isAdmin: boolean) {
    this.props.isAdmin = isAdmin
  }

  static create(props: Optional<UserProps, 'isAdmin'>, id?: UniqueEntityId) {
    const user = new User({ ...props, isAdmin: props.isAdmin ?? false }, id)

    return user
  }
}
