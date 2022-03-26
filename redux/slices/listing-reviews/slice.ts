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
  name: 'listing-reviews',
  reducers: {
    fetch: state => {
      state.loading = true
    },
    fetchTotalCount: () => {},
    loadedReviews: (state, action: PayloadAction<MovieReview[]>) => {
      state.loading = false
      state.listReviews = action.payload
    },
    loadedTotal: (state, action: PayloadAction<number>) => {
      state.totalReviews = action.payload
    },
    toggleLoading: state => {
      state.loading = !state.loading
    }
  }
})

export const { actions } = slice
export type SliceAction = typeof actions
export default slice.reducer
