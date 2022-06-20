import { configureStore } from '@reduxjs/toolkit'
import postReducer from './features/posts/postReducer'
import authReducer from './features/auth/authReducer'
import notificationReducer from './features/notificationReducer'
import usersReducer from './features/users/usersReducer'

const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        notification: notificationReducer,
        users: usersReducer
    }
})

export default store