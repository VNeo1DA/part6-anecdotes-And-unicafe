import { createContext, useReducer, useContext  } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return { notification : `'${action.payload.content}' has been added` }
        case 'VOTE':
            return { notification : `'${action.payload.content}' voted` }
        case 'CLEAR':
            return { notification: '' }
        case 'ERROR':
            return { notification : action.payload.content }
        default:
            return state
    }
}
const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, {notification: ''})
  
    return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext