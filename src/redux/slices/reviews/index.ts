export { actions as reviewsActions } from './slice'
export { default as reviewsReducer } from './slice'
import { combineEpics } from 'redux-observable'
import { listing, getTotalCount, update } from './epics'

export const reviewsEpics = combineEpics(listing, getTotalCount, update)
