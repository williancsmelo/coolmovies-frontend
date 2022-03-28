import { AlertColor } from '@mui/material'
import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { notificationActions } from '../redux'

const { showNotification: notify } = notificationActions

export const showNotification =
  (message: string, type?: AlertColor) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(notify({ message, type }))
  }
