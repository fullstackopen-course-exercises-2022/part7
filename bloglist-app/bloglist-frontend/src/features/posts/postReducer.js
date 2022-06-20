import { Blogs } from './blogs'
import { createSlice } from '@reduxjs/toolkit'
import { notification } from '../notificationReducer'

const initialState = []

export const createBlogAction = (formData) => async (dispatch) => {
    try {
        const response = await Blogs.create(formData)
        dispatch(createBlog(response))
    } catch(err) {
        const message = (err.response && err.response.data && err.response.data.msg) || err.response || err.toString()
        console.log(err)
        dispatch(notification(message, 5))
    }
}

export const getBlogAction = () => async (dispatch) => {
    try {
        const response = await Blogs.getAll()
        dispatch(setBlog(response))
    } catch(err) {
        console.log(err)
    }
}

export const deleteBlogAction = (id) => async (dispatch) => {
    try {
        const response = await Blogs.deleteById(id)
        dispatch(deleteBlog(response))
    } catch(err) {
        const message = (err.response && err.response.data && err.response.data.msg) || err.response || err.toString()
        console.log(err)
        dispatch(notification(message, 5))
    }
}

export const likeBlogAction = (id, formData) => async (dispatch) => {
    try {
        const payload = await Blogs.updateById(id, formData)
        console.log(formData)
        dispatch(likeBlog(payload))
    } catch(err) {
        console.log(err)
        dispatch(notification('Something went wrong!', 5))
    }
}

export const commentBlogAction = (id, data) => async (dispatch) => {
    try {
        const payload = await Blogs.addComments(id, data)
        dispatch(commentBlog(payload))
    } catch(err) {
        const message = (err.response && err.response.data && err.response.data.msg) || err.response || err.toString()
        dispatch(notification(message, 5))
        console.log(message)
    }
}

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        createBlog(state, action) {
            state.push(action.payload)
        },
        setBlog(state, action) {
            console.log(action)
            return action.payload
        },
        deleteBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload)
        },
        likeBlog(state, action) {
            const id = action.payload.id
            const findBlog = state.find(blog => blog.id === id)
            const likeBlog = {
                ...findBlog,
                likes: action.payload.likes
            }
            return state.map(blog => (blog.id === id ? likeBlog : blog))
        },
        commentBlog(state, action) {
            const blogId = action.payload.id
            return state.map(blog => blog.id !== blogId ? blog : action.payload)
        }
    }
})

export const { createBlog, setBlog, deleteBlog, likeBlog, commentBlog } = blogSlice.actions
export default blogSlice.reducer