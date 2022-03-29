import config from '../config/listing-page'

const { PAGE_SIZE } = config

export const getOffset = (page: number) => {
  if (page <= 0) {
    throw new Error('Page has to be positive')
  }
  return (page - 1) * PAGE_SIZE
}
