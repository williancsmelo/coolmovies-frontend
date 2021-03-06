import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  exampleReducer,
  exampleEpics,
  reviewsEpics,
  reviewsReducer,
  moviesEpics,
  moviesReducer,
  usersEpics,
  usersReducer,
  notificationReducer
} from './slices'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { CreateStoreOptions } from './types'

const rootEpic = combineEpics(
  exampleEpics,
  reviewsEpics,
  moviesEpics,
  usersEpics
)

export const createStore = ({ epicDependencies }: CreateStoreOptions) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: epicDependencies
  })

  const createdStore = configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(epicMiddleware),
    reducer: {
      example: exampleReducer,
      reviews: reviewsReducer,
      movies: moviesReducer,
      users: usersReducer,
      notification: notificationReducer
    }
  })

  epicMiddleware.run(rootEpic)

  return createdStore
}

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>
export type AppDispatch = ReturnType<typeof createStore>['dispatch']

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
