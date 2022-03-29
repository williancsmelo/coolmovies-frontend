import { getOffset } from '../src/helpers/listing-reviews'

test('should return right offset to get data for page', () => {
  expect(getOffset(1)).toBe(0)
  expect(getOffset(20)).toBe(95)
  expect(() => getOffset(-5)).toThrow(Error)
  expect(() => getOffset(0)).toThrow(Error)
})
