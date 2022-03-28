import { Snackbar, Alert, AlertColor } from '@mui/material'
import config from '../../config/notification'
import {
  useAppSelector,
  useAppDispatch,
  notificationActions
} from '../../redux'

const { DURATION_TIME } = config

const Notification = () => {
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(notificationActions.hideNotification())
  }
  const { message, type, visible } = useAppSelector(state => state.notification)
  return (
    <Snackbar
      open={visible}
      autoHideDuration={DURATION_TIME}
      onClose={handleClose}
    >
      <Alert severity={type} sx={{ width: '100%' }} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
