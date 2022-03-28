import { gql } from '@apollo/client'
import { Epic, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { filter, switchMap } from 'rxjs/operators'
import { RootState } from '../../store'
import { EpicDependencies } from '../../types'
import { actions, SliceAction } from './slice'

type FetchReviewsConfig = {
  limit: number
  offset?: number
}

export const listingEpic: Epic = (
  action$: Observable<SliceAction['fetch']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async params => {
      const { payload } = params as unknown as { payload: FetchReviewsConfig }
      const queryConfig = {
        limit: payload.limit,
        offset: payload?.offset || 0
      }
      try {
        const result = await client.query({
          query: loadReviewsQuery(queryConfig)
        })
        return actions.loadedReviews(result.data.allMovieReviews.nodes)
      } catch (err) {
        actions.loadError('Error listing reviews')
        return actions.toggleLoading()
      }
    })
  )

export const getTotalCount: Epic = (
  action$: Observable<SliceAction['fetchTotalCount']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetchTotalCount.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: loadTotalCount
        })
        return actions.loadedTotal(result.data?.allMovieReviews.totalCount)
      } catch (err) {
        console.log(err)
        return actions.loadError('Error getting total reviews')
      }
    })
  )

const loadReviewsQuery = ({
  limit,
  offset
}: {
  limit: number
  offset: number
}) => gql`
  query AllMovieReviews {
    allMovieReviews(offset: ${offset}, first: ${limit}) {
      nodes {
        id
        body
        title
        rating
        movie: movieByMovieId {
          imgUrl
          title
          releaseDate
          id
          director: movieDirectorByMovieDirectorId {
            name
            id
          }
        }
        user: userByUserReviewerId {
          id
          name
        }
      }
    }
  }
`

const loadTotalCount = gql`
  query countRegistry {
    allMovieReviews {
      totalCount
    }
  }
`
