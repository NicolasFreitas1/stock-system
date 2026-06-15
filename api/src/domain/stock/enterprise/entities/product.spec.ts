import { Product } from '@/domain/stock/enterprise/entities/product'

describe('Product entity invariants', () => {
  function makeProduct(
    overrides: Partial<Parameters<typeof Product.create>[0]> = {},
  ) {
    return Product.create({
      name: 'Example',
      barcode: '1234567890123',
      quantity: 10,
      value: 25,
      ...overrides,
    })
  }

  describe('decreaseStock', () => {
    it('should decrease the stock when there is enough quantity available', () => {
      const product = makeProduct({ quantity: 10 })

      product.decreaseStock(3)

      expect(product.quantity).toBe(7)
    })

    it('should reject a non-positive quantity', () => {
      const product = makeProduct({ quantity: 10 })

      expect(() => product.decreaseStock(0)).toThrow(
        'Quantity to decrease must be positive.',
      )
      expect(() => product.decreaseStock(-1)).toThrow(
        'Quantity to decrease must be positive.',
      )
      expect(product.quantity).toBe(10)
    })

    it('should reject a decrease that would result in negative stock', () => {
      const product = makeProduct({ quantity: 2 })

      expect(() => product.decreaseStock(5)).toThrow(
        'Cannot decrease stock below zero.',
      )
      expect(product.quantity).toBe(2)
    })
  })

  describe('increaseStock', () => {
    it('should increase the stock by the given quantity', () => {
      const product = makeProduct({ quantity: 4 })

      product.increaseStock(6)

      expect(product.quantity).toBe(10)
    })

    it('should reject a non-positive quantity', () => {
      const product = makeProduct({ quantity: 4 })

      expect(() => product.increaseStock(0)).toThrow(
        'Quantity to increase must be positive.',
      )
      expect(() => product.increaseStock(-2)).toThrow(
        'Quantity to increase must be positive.',
      )
      expect(product.quantity).toBe(4)
    })
  })

  describe('updateDetails', () => {
    it('should update all editable fields when the data is valid', () => {
      const product = makeProduct()

      product.updateDetails({
        name: 'New name',
        barcode: '9876543210987',
        quantity: 50,
        value: 99.9,
      })

      expect(product.name).toBe('New name')
      expect(product.barcode).toBe('9876543210987')
      expect(product.quantity).toBe(50)
      expect(product.value).toBe(99.9)
    })

    it('should reject an empty name', () => {
      const product = makeProduct()

      expect(() =>
        product.updateDetails({
          name: '   ',
          barcode: '1234567890123',
          quantity: 5,
          value: 10,
        }),
      ).toThrow('Product name cannot be empty.')
    })

    it('should reject an empty barcode', () => {
      const product = makeProduct()

      expect(() =>
        product.updateDetails({
          name: 'name',
          barcode: '',
          quantity: 5,
          value: 10,
        }),
      ).toThrow('Product barcode cannot be empty.')
    })

    it('should reject a negative quantity', () => {
      const product = makeProduct()

      expect(() =>
        product.updateDetails({
          name: 'name',
          barcode: '1234567890123',
          quantity: -1,
          value: 10,
        }),
      ).toThrow('Product quantity must be zero or a positive number.')
    })

    it('should reject a non-positive value', () => {
      const product = makeProduct()

      expect(() =>
        product.updateDetails({
          name: 'name',
          barcode: '1234567890123',
          quantity: 5,
          value: 0,
        }),
      ).toThrow('Product value must be a positive number.')
    })
  })
})
