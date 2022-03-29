import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MoviesState {
  listMovies: Pick<Movie, 'id' | 'title'>[]
}

const initialState: MoviesState = {
  listMovies: []
}

export const slice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    fetch: () => {},
    loadedMovies: (
      state,
      action: PayloadAction<Pick<Movie, 'id' | 'title'>[]>
    ) => {
      state.listMovies = action.payload
    }
  }
})

export const { actions } = slice
export type SliceAction = typeof actions
export default slice.reducer
