import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(window.localStorage.getItem('userInfo'))

const initialState = {
    user: user ? user : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        }
    }
})

export const { setUser } = authSlice.actions
export default authSlice.reducer