import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ListingState {
  listReviews: MovieReview[]
  loading: boolean
  totalReviews: number
}

const initialState: ListingState = {
  listReviews: [],
  loading: false,
  totalReviews: 1
}

export const slice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    fetch: (
      state,
      action: PayloadAction<{ limit: number; offset?: number }>
    ) => {
      state.loading = true
    },
    fetchTotalCount: (state, action: PayloadAction<void>) => {},
    loadedReviews: (state, action: PayloadAction<MovieReview[]>) => {
      state.loading = false
      state.listReviews = action.payload
    },
    loadedTotal: (state, action: PayloadAction<number>) => {
      state.totalReviews = action.payload
    },
    loadError: (state, action: PayloadAction<string>) => {
      state.listReviews = []
    },
    toggleLoading: state => {
      state.loading = !state.loading
    },
    update: (state, action: PayloadAction<Partial<MovieReview>>) => {},
    successfulUpdate: (state, action: PayloadAction<string>) => {},
    create: (state, action: PayloadAction<Partial<MovieReview>>) => {},
    successfulCreate: (state, action: PayloadAction<string>) => {}
  }
})

export const { actions } = slice
export type SliceAction = typeof actions
export default slice.reducer
