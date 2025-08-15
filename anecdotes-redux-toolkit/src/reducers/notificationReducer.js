import { createSlice } from '@reduxjs/toolkit'
const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationMessage(state, action) {
      return action.payload
    },
    clearNotification: () =>  initialState
  }

})

export const { notificationMessage, clearNotification } = notificationSlice.actions

export const setNotification = (notification, duration ) => {
  return (dispatch) => {
    dispatch(notificationMessage(notification))

    setTimeout(() => {
      dispatch(clearNotification())
    }, duration)
  }
}

export default notificationSlice.reducer