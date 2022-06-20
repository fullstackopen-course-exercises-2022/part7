import React, { useEffect } from 'react'
import Toggle from './Toggle'
import { useSelector, useDispatch } from 'react-redux'
import { getBlogAction, deleteBlogAction, likeBlogAction } from '../features/posts/postReducer'
import BlogForm from '../components/BlogForm'
import { notification } from '../features/notificationReducer'
import { Card, Container } from 'react-bootstrap'

const Blogs = ({ viewRef }) => {
    const blogs = useSelector(state => state.post)
    console.log(blogs)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBlogAction())
    }, [])

    const handleLikeBlog = async (blogId, like) => {
      try {
        dispatch(likeBlogAction(blogId, { likes: like + 1 }))
      } catch(err) {
        dispatch(notification('Successfully liked Blog!', 5))
        console.log(err)
      }
    }

    const handleDeleteBlog = async (id) => {
      try {
        if(window.confirm(`Are you sure you want to remove Blog ${id} from your arsenal!`)) {
          dispatch(deleteBlogAction(id))
          dispatch(notification('Successfully deleted Blog!', 5))
        } else {
          return false
        }
      } catch(err) {
        console.log(err)
      }
    }
    // const sortLikes = (a, b) => (a.likes - b.likes)
    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
    return (
        <div className="blog">
            <BlogForm /><br />
            <Container style={style}>
                {blogs.map((blog => (
                    <div key={blog.id}>
                        <Card>
                            <Card.Header>
                                <div>
                                    <a href={`/blog/${blog.id}`}>{blog.title}</a>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Toggle buttonLabel='View' ref={viewRef}>
                                    <div>{blog.author}</div>
                                    <div>{blog.url}</div>
                                    <div>{blog.likes}</div>
                                    <button className="btn-like" id="like-btn" onClick={() => handleLikeBlog(blog.id, blog.likes || 0)}>Like</button>
                                    <button className="btn-delete" id="delete-btn" onClick={() => handleDeleteBlog(blog.id)}>Delete Blog</button>
                                </Toggle>
                            </Card.Body>
                        </Card>
                    </div>
                )))}
            </Container>
        </div>
    )
}


export default Blogs