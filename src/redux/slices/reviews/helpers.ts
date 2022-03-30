import { ApolloCache } from '@apollo/client'
import { loadReviewsQuery } from '../../../graphql/reviews'
import config from '../../../config/listing-page'
import { getOffset } from '../../../helpers/listing-reviews'

const { PAGE_SIZE } = config

export const updateQuery = (
  cache: ApolloCache<any>,
  currentPage: number,
  newData: any,
  handleCache: (data: typeof newData, cacheData: any[]) => any[],
  handleCount: (currentCount: number) => number
) => {
  const queryToUpdate = {
    query: loadReviewsQuery,
    variables: {
      offset: getOffset(currentPage),
      limit: PAGE_SIZE
    }
  }
  const dataInCache = cache.readQuery(queryToUpdate)
  const newCache = {
    allMovieReviews: {
      ...dataInCache.allMovieReviews,
      nodes: handleCache(newData, dataInCache.allMovieReviews.nodes),
      totalCount: handleCount(dataInCache.allMovieReviews.totalCount)
    }
  }
  cache.writeQuery({
    ...queryToUpdate,
    data: newCache
  })
}
