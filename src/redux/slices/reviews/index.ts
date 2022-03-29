export { actions as reviewsActions } from './slice'
export { default as reviewsReducer } from './slice'
import { combineEpics } from 'redux-observable'
import {
  listingEpic,
  getTotalCountEpic,
  updateEpic,
  createEpic,
  loadErrorEpic
} from './epics'

export const reviewsEpics = combineEpics(
  listingEpic,
  getTotalCountEpic,
  updateEpic,
  createEpic,
  loadErrorEpic
)
