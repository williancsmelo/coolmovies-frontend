import { Epic, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { filter, switchMap, concatMap } from 'rxjs/operators'
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
import { notificationActions as notification } from '../notification'

const { PAGE_SIZE } = config

type FetchReviewsConfig =
  | {
      limit?: number
      offset: number
    }
  | undefined

export const loadErrorEpic: Epic = (
  action$: Observable<SliceAction['loadError']>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    filter(actions.loadError.match),
    switchMap(async params => {
      const { payload } = params
      return notification.showNotification({ message: payload, type: 'error' })
    })
  )

export const listingEpic: Epic = (
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
      try {
        const result = await client.query({
          query: loadReviewsQuery(queryConfig)
        })
        return actions.loadedReviews(result.data.allMovieReviews.nodes)
      } catch (err) {
        return actions.loadError('Error listing reviews')
      }
    })
  )

export const getTotalCountEpic: Epic = (
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
        return actions.loadedTotal(0)
      }
    })
  )

export const updateEpic: Epic = (
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
        actions.fetch()
        return notification.showNotification({
          message: `Review ${payload.title} updated`,
          type: 'success'
        })
      } catch (err) {
        console.error(err)
        return actions.loadError('Error updating review')
      }
    })
  )

export const createEpic: Epic = (
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
        actions.fetch()
        return notification.showNotification({
          message: `Review ${payload.title} created`,
          type: 'success'
        })
      } catch (err) {
        console.error(err)
        return actions.loadError('Error creating review')
      }
    })
  )
