import { concat } from '~/common/string'

describe('Concatenar strings', () => {
  test('Deve ser uma função', () => {
    expect(concat).toBeInstanceOf(Function)
  })

  test('Deve concatenar "Foo" e "Bar" => "FooBar"', () => {
    /**
     * Normalize.
     */
    const normalizedString = concat('Foo', 'Bar')

    /**
     * Expected value.
     */
    expect(normalizedString).toBe('FooBar')
  })
})
