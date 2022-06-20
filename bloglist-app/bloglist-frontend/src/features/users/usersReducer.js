import { createSlice } from '@reduxjs/toolkit'
import { Users } from './userService'
import { notification } from '../notificationReducer'

const initialState = []

export const initializeUsers = () => async (dispatch) => {
    try {
        const users = await Users.getUsers()
        dispatch(setUsers(users))
    } catch(err) {
        const message = (
            err.response &&
            err.response.data &&
            err.response.data.msg
        ) || err.msg || err.toString()
        dispatch(notification(message, 5))
    }
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }
})

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer