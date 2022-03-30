import { getRating } from '../../src/components/helpers/rating'

test('should return rating in array of boolean', () => {
  expect(getRating(1, 5)).toEqual([true, false, false, false, false])
  expect(getRating(10, 10)).toEqual([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ])
  expect(() => getRating(6, 3)).toThrow(Error)
  expect(() => getRating(-3, 5)).toThrow(Error)
  expect(getRating(0, 5)).toEqual([false, false, false, false, false])
})
