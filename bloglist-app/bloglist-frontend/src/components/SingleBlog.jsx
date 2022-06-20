import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlogAction, commentBlogAction } from '../features/posts/postReducer'
import { notification } from '../features/notificationReducer'

function SingleBlog({ post }) {
    const dispatch = useDispatch()
    const { postId } = useParams()

    useEffect(() => {
        dispatch(getBlogAction())
    }, [dispatch])

    const blog = post?.find(post => post.id === postId)

    const handleCommentBlog = (evt) => {
        evt.preventDefault()
        const comment = evt.target.text.value
        evt.target.text.value = ''
        const formData = {
            text: comment
        }
        dispatch(commentBlogAction(blog.id, formData))
        dispatch(notification('Successfully Created Comment!', 5))
    }

    return (
        <div>
            <h1>{blog?.title}</h1>
            <p>{blog?.author}</p>
            <a href={blog?.url}>{blog?.url}</a>
            <p>Added by {blog?.user?.name}</p>
            <h3>Comments:</h3>
            <form onSubmit={handleCommentBlog}>
                <input type="text" name='text' placeholder="Add your Comment" />
                <button type='submit'>Comment</button>
            </form>
            <ul>
                {blog?.comments?.map(comment => (
                    <li key={comment?._id}>{comment?.text}</li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}

const connectBlog = connect(mapStateToProps)(SingleBlog)

export default connectBlog