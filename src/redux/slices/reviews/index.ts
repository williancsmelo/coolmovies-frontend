export { actions as reviewsActions } from './slice'
export { default as reviewsReducer } from './slice'
import { combineEpics } from 'redux-observable'
import {
  listingEpic,
  updateEpic,
  createEpic,
  loadErrorEpic,
  deleteEpic
} from './epics'

export const reviewsEpics = combineEpics(
  listingEpic,
  updateEpic,
  createEpic,
  loadErrorEpic,
  deleteEpic
)
