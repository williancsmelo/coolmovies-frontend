import { Epic, StateObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, switchMap } from 'rxjs/operators'
import { RootState } from '../../store'
import { EpicDependencies } from '../../types'
import { actions, SliceAction } from './slice'
import { loadUsersQuery } from '../../../graphql/users'
import { notificationActions as notify } from '../notification'

export const listUsersEpic: Epic = (
  action$: Observable<SliceAction['fetch']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: loadUsersQuery
        })
        return actions.loadedUsers(result.data.allUsers.nodes)
      } catch (err) {
        return notify.showNotification({
          message: 'Error listing users',
          type: 'error'
        })
      }
    })
  )
