import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { NameAlreadyInUseError } from '../__errors/name-already-in-use-error'
import { Sale } from '@/domain/stock/enterprise/entities/sale'
import { SalesRepository } from '../../repositories/sales-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ProductsRepository } from '../../repositories/products-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface EditSaleUseCaseRequest {
  saleId: string
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

type EditSaleUseCaseResponse = Either<
  ResourceNotFoundError | NameAlreadyInUseError,
  {
    sale: Sale
  }
>

@Injectable()
export class EditSaleUseCase {
  constructor(
    private salesRepository: SalesRepository,
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    saleId,
    productId,
    quantity,
    sellerId,
    soldAt,
    paymentMethod,
  }: EditSaleUseCaseRequest): Promise<EditSaleUseCaseResponse> {
    const sale = await this.salesRepository.findById(saleId)

    if (!sale) {
      return left(new ResourceNotFoundError())
    }

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    const seller = await this.usersRepository.findById(sellerId)

    if (!seller) {
      return left(new ResourceNotFoundError())
    }

    if (productId !== sale.productId.toString()) {
      product.quantity = product.quantity + sale.quantity

      await this.productsRepository.save(product)
    }

    product.quantity = product.quantity + sale.quantity - quantity

    sale.quantity = quantity
    sale.sellerId = seller.id
    sale.quantity = quantity
    sale.value = product.value * quantity
    sale.soldAt = soldAt
    sale.paymentMethod = paymentMethod

    await this.salesRepository.save(sale)
    await this.productsRepository.save(product)

    return right({ sale })
  }
}
