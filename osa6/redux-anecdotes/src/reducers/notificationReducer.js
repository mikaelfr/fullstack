export const setNotification = (notification, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })

        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: ''
            })
        }, timeout * 1000)
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification

        default: return state
    }
}

export default notificationReducer