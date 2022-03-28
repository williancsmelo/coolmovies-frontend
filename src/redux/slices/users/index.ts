export { actions as usersActions } from './slice'
export { default as usersReducer } from './slice'
import { combineEpics } from 'redux-observable'
import { listUsersEpic } from './epics'

export const usersEpics = combineEpics(listUsersEpic)
