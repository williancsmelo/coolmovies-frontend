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
  createReview,
  deleteReview
} from '../../../graphql/reviews'
import config from '../../../config/listing-page'
import {
  notificationActions as notification,
  notificationActions
} from '../notification'
import { getOffset } from '../../../helpers/listing-reviews'
import { updateQuery } from './helpers'

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
        offset: getOffset(state$.value.reviews.currentPage)
      }
      if (payload) {
        queryConfig = {
          limit: payload?.limit || PAGE_SIZE,
          offset: payload.offset
        }
      }
      try {
        const result = await client.query({
          query: loadReviewsQuery,
          variables: queryConfig
        })
        return actions.loadedReviews(result.data.allMovieReviews)
      } catch (err) {
        console.error(err)
        return actions.loadError('Error listing reviews')
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
        return actions.fetch()
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
          },
          update: (cache, { data }) => {
            const newReview = data.createMovieReview.movieReview
            updateQuery(
              cache,
              state$.value.reviews.currentPage,
              newReview,
              (data, cache) => {
                const newCache = [data, ...cache]
                if (newCache.length > PAGE_SIZE) {
                  newCache.pop()
                }
                return newCache
              },
              count => count + 1
            )
          }
        })
        return actions.fetch()
      } catch (err) {
        console.error(err)
        return actions.loadError('Error creating review')
      }
    })
  )

export const deleteEpic: Epic = (
  action$: Observable<SliceAction['delete']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.delete.match),
    switchMap(async ({ payload }: { payload: string }) => {
      try {
        await client.mutate({
          mutation: deleteReview,
          variables: {
            reviewId: payload
          },
          update: (cache, { data }) => {
            const { id: deletedId } = data.deleteMovieReviewById.movieReview
            updateQuery(
              cache,
              state$.value.reviews.currentPage,
              deletedId,
              (data, cacheData) => cacheData.filter(c => c.id !== data),
              count => count - 1
            )
          }
        })
        return actions.fetch()
      } catch (err) {
        console.error(err)
        return actions.loadError('Error deleting review')
      }
    })
  )
