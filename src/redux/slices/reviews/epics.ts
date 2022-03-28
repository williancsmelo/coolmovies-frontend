import { Epic, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { filter, switchMap } from 'rxjs/operators'
import { RootState } from '../../store'
import { EpicDependencies } from '../../types'
import { actions, SliceAction } from './slice'
import {
  loadReviewsQuery,
  loadTotalCount,
  updateReview,
  createReview
} from '../../../graphql/reviews'
import config from '../../../config/listing-page'
import { reviewsActions } from '.'

const { PAGE_SIZE } = config

type FetchReviewsConfig =
  | {
      limit?: number
      offset: number
    }
  | undefined

export const listing: Epic = (
  action$: Observable<SliceAction['fetch']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async params => {
      const { payload } = params as { payload?: FetchReviewsConfig }
      let queryConfig = {
        limit: PAGE_SIZE,
        offset: (state$.value.reviews.currentPage - 1) * PAGE_SIZE
      }
      if (payload) {
        queryConfig = {
          limit: payload?.limit || PAGE_SIZE,
          offset: payload.offset
        }
      }
      console.log('fetching reviews', queryConfig)
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
        console.error(err)
        return actions.loadError('Error getting total reviews')
      }
    })
  )

export const update: Epic = (
  action$: Observable<SliceAction['update']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.update.match),
    switchMap(async ({ payload }: { payload: Partial<MovieReview> }) => {
      if (!payload?.id) {
        return actions.loadError('Error updating review')
      }
      try {
        await client.mutate({
          mutation: updateReview,
          variables: {
            movieId: payload.movie?.id,
            ...payload
          }
        })
        reviewsActions.fetch()
        return actions.successfulUpdate(`Review ${payload.title} updated`)
      } catch (err) {
        console.error(err)
        return actions.loadError('Error updating review')
      }
    })
  )

export const create: Epic = (
  action$: Observable<SliceAction['create']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.create.match),
    switchMap(async ({ payload }: { payload: Partial<MovieReview> }) => {
      try {
        await client.mutate({
          mutation: createReview,
          variables: {
            movieId: payload.movie?.id,
            userId: payload.user?.id,
            ...payload
          }
        })
        reviewsActions.fetch()
        return actions.successfulCreate(`Review ${payload.title} created`)
      } catch (err) {
        console.error(err)
        return actions.loadError('Error creating review')
      }
    })
  )
