export { actions as listingActions } from './slice'
export { default as listingReducer } from './slice'
import { combineEpics } from 'redux-observable'
import { listingEpic, getTotalCount } from './epics'

export const listingEpics = combineEpics(listingEpic, getTotalCount)
