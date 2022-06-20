const initialState = null

const notificationReducer = (state = initialState, action) => {
    const { message, type } = action
    switch(type) {
        case 'SET_NOTIFICATION':
            return message
        case 'REMOVE_NOTIFICATION':
            return message
        default: return state
    }
}

export const notification = (message, time) => async (dispatch) => {
    dispatch({
        type: 'SET_NOTIFICATION',
        message
    })

    setTimeout(() => {
        dispatch({
            type: 'REMOVE_NOTIFICATION',
            message: null
        })
    }, time * 1000)
}

export default notificationReducer