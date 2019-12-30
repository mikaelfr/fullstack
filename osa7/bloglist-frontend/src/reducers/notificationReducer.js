export const setSuccessMessage = (notification, timeout = 5) => {
  return async dispatch => {
    dispatch({
      type: 'SET_SUCCESS',
      notification
    })

    setTimeout(() => {
      dispatch({
        type: 'SET_SUCCESS',
        notification: ''
      })
    }, timeout * 1000)
  }
}

export const setErrorMessage = (notification, timeout = 5) => {
  return async dispatch => {
    dispatch({
      type: 'SET_ERROR',
      notification
    })

    setTimeout(() => {
      dispatch({
        type: 'SET_ERROR',
        notification: ''
      })
    }, timeout * 1000)
  }
}

const notificationReducer = (state = { success: '', error: '' }, action) => {
  switch (action.type) {
  case 'SET_SUCCESS':
    return { success: action.notification, error: state.error }

  case 'SET_ERROR':
    return { success: state.success, error: action.notification }

  default: return state
  }
}

export default notificationReducer