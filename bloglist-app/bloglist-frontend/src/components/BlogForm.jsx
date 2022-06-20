import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlogAction } from '../features/posts/postReducer'
import { Form, FormControl } from 'react-bootstrap'

function BlogForm() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [like, setLike] = useState(0)
    const dispatch = useDispatch()

    const handleCreateBlog = (evt) => {
        evt.preventDefault()
        dispatch(createBlogAction({ title, author, url, like }))
        setTitle('')
        setAuthor('')
        setUrl('')
        setLike(0)
    }
    return (
        <div className="container">
            <h2>Create New Blog</h2>
            <Form onSubmit={handleCreateBlog} className="form">
                <Form.Group>
                    <label htmlFor="title">Title</label>
                    <FormControl type="text" name="title" id="form__input" value={title} onChange={({target}) => setTitle(target.value)} />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="author">Author</label>
                    <FormControl type="text" name="author" className="form__input" value={author} onChange={({target}) => setAuthor(target.value)} />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="url">Url Link</label>
                    <FormControl type="text" name="url" className="form__input" value={url} onChange={({target}) => setUrl(target.value)} />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="like">Like</label>
                    <FormControl type="number" name="like" className="form__input" value={like} onChange={({target}) => setLike(target.value)} />
                </Form.Group><br />
                <FormControl type="submit" value="Create Blog" />
            </Form>
        </div>
    )
}

export default BlogForm