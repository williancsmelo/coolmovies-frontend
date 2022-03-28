import { Epic, StateObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, switchMap } from 'rxjs/operators'
import { RootState } from '../../store'
import { EpicDependencies } from '../../types'
import { actions, SliceAction } from './slice'
import { loadMoviesQuery } from '../../../graphql/movies'

export const listMoviesEpic: Epic = (
  action$: Observable<SliceAction['fetch']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async params => {
      try {
        const result = await client.query({
          query: loadMoviesQuery
        })
        return actions.loadedMovies(result.data.allMovies.nodes)
      } catch (err) {
        return actions.loadError('Error listing movies')
      }
    })
  )
