import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ReviewsState {
  listReviews: MovieReview[]
  loading: boolean
  totalReviews: number
  currentPage: number
}

const initialState: ReviewsState = {
  listReviews: [],
  loading: false,
  totalReviews: 0,
  currentPage: 1
}

export const slice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    fetch: (
      state,
      action: PayloadAction<{ limit: number; offset: number } | undefined>
    ) => {
      state.loading = true
    },
    loadedReviews: (
      state,
      action: PayloadAction<{ nodes: MovieReview[]; totalCount: number }>
    ) => {
      state.loading = false
      state.listReviews = action.payload.nodes
      state.totalReviews = action.payload.totalCount
    },
    loadError: (state, action: PayloadAction<string>) => {
      state.loading = false
    },
    toggleLoading: state => {
      state.loading = !state.loading
    },
    changeListingPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    update: (state, action: PayloadAction<Partial<MovieReview>>) => {},
    create: (state, action: PayloadAction<Partial<MovieReview>>) => {},
    delete: (state, action: PayloadAction<string>) => {}
  }
})

export const { actions } = slice
export type SliceAction = typeof actions
export default slice.reducer
