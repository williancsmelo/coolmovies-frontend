import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UsersState {
  listUsers: User[]
}

const initialState: UsersState = {
  listUsers: []
}

export const slice = createSlice({
  initialState,
  name: 'users',
  reducers: {
    fetch: () => {},
    loadedUsers: (state, action: PayloadAction<User[]>) => {
      state.listUsers = action.payload
    }
  }
})

export const { actions } = slice
export type SliceAction = typeof actions
export default slice.reducer
