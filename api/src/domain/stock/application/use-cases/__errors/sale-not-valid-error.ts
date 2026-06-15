import { UseCaseError } from '@/core/errors/use-cases-error'

export class SaleNotValidError extends Error implements UseCaseError {
  constructor() {
    super(`Sale Not Valid`)
  }
}
