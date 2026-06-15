import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { InMemoryTagsRepository} from 'test/repositories/in-memory-tags-repository'
import { InMemoryProductTagsRepository } from 'test/repositories/in-memory-productsTags-repository'
import { CreateProductWithTagsUseCase } from '../create-product-with-tags'
import { Tag } from '@/domain/stock/enterprise/entities/tag'

let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryTagsRepository: InMemoryTagsRepository
let inMemoryProductTagsRepository: InMemoryProductTagsRepository

let sut: CreateProductWithTagsUseCase

describe('Create Product with Tags', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryTagsRepository = new InMemoryTagsRepository()
    inMemoryProductTagsRepository = new InMemoryProductTagsRepository() 

    sut = new CreateProductWithTagsUseCase(
      inMemoryProductsRepository,
      inMemoryTagsRepository,
      inMemoryProductTagsRepository,
    )
  })

  it('should be able to register a new product with new tags', async () => {
    const result = await sut.execute({
      name: 'example product',
      quantity: 10,
      value: 99.99,
      barcode: '1234567890123',
      tagNames: ['tag1', 'tag2'],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      product: inMemoryProductsRepository.items[0],
    })
    expect(inMemoryTagsRepository.items.length).toBe(2) 
    expect(inMemoryProductTagsRepository.items.length).toBe(2) 
  })

  it('should reuse existing tags when registering a product', async () => {
   
    const existingTag = Tag.create({ name: 'existing tag' })
    await inMemoryTagsRepository.create(existingTag)

    const result = await sut.execute({
      name: 'example product',
      quantity: 10,
      value: 99.99,
      barcode: '1234567890123',
      tagNames: ['existing tag'],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      product: inMemoryProductsRepository.items[0],
    })
    expect(inMemoryTagsRepository.items.length).toBe(2) 
    expect(inMemoryProductTagsRepository.items.length).toBe(1) 
  })
})
