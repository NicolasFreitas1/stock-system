import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Sale } from '@/domain/stock/enterprise/entities/sale'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'
import { ProductsRepository } from '../../repositories/products-repository'
import { SalesRepository } from '../../repositories/sales-repository'
import { SaleNotValidError } from '../__errors/sale-not-valid-error'

interface CreateSaleUseCaseRequest {
  quantity: number
  soldAt: Date
  productId: string
  sellerId: string
  paymentMethod:
    | 'CREDIT_CARD'
    | 'DEBIT_CARD'
    | 'BANK_TRANSFER'
    | 'BANK_SLIP'
    | 'CASH'
    | 'PIX'
    | 'OTHER'
}

type CreateSaleUseCaseResponse = Either<
  ResourceNotFoundError | SaleNotValidError,
  {
    sale: Sale
  }
>

@Injectable()
export class CreateSaleUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private productsRepository: ProductsRepository,
    private salesRepository: SalesRepository,
  ) {}

  async execute({
    productId,
    quantity,
    sellerId,
    soldAt,
    paymentMethod,
  }: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse> {
    const seller = await this.usersRepository.findById(sellerId)

    if (!seller) {
      return left(new ResourceNotFoundError())
    }

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    if (product.quantity < quantity && product.quantity - quantity < 0) {
      return left(new SaleNotValidError())
    }

    const sale = Sale.create({
      productId: product.id,
      quantity,
      sellerId: seller.id,
      value: product.value * quantity,
      soldAt,
      paymentMethod,
    })

    await this.salesRepository.create(sale)

    product.quantity = product.quantity - quantity

    await this.productsRepository.save(product)

    return right({
      sale,
    })
  }
}
