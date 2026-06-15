import { UseCaseError } from '@/core/errors/use-cases-error'

export class ProductAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Product with barcode "${identifier}" already exists`)
  }
}
