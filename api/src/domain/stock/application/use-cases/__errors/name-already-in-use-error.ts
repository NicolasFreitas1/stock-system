import { UseCaseError } from '@/core/errors/use-cases-error'

export class NameAlreadyInUseError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Name "${identifier}" is already in use`)
  }
}
