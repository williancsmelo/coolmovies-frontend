import { getImageSize } from '../../src/components/helpers/image'

test('should width and height for image with ratio', () => {
  expect(getImageSize(10, '16:9')).toEqual({
    width: 160,
    height: 90
  })
  expect(getImageSize(41, '4:3')).toEqual({
    width: 164,
    height: 123
  })
  expect(getImageSize(41, '11:32')).toEqual({
    width: 451,
    height: 1312
  })
  expect(() => getImageSize(32, '-16:9')).toThrow(Error)
  expect(() => getImageSize(-5, '4:3')).toThrow(Error)
  expect(() => getImageSize(20, '43')).toThrow(Error)
})
