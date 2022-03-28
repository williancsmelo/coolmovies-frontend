import { AlertColor } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotificationState {
  message: string
  visible: boolean
  type?: AlertColor
}

const initialState: NotificationState = {
  message: '',
  visible: false,
  type: 'info'
}

export const slice = createSlice({
  initialState,
  name: 'notification',
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; type?: AlertColor }>
    ) => {
      state.message = action.payload.message
      state.type = action.payload.type
      state.visible = true
    },
    hideNotification: state => {
      state.visible = false
    }
  }
})

export const { actions } = slice
export type SliceAction = typeof actions
export default slice.reducer
