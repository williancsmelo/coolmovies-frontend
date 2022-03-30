export const getImageSize = (base: number, ratio: string) => {
  const arrayRatio = ratio.split(':')
  if (!Array.isArray(arrayRatio) || arrayRatio.length !== 2) {
    throw new Error('Invalid ratio')
  }
  const [width, height] = arrayRatio.map(r => parseInt(r))
  if (width < 0 || height < 0 || base < 0) {
    throw new Error('Ratio and base cannot be negative')
  }
  return {
    width: base * width,
    height: base * height
  }
}
