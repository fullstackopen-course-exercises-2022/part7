import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('check the form calls the event handler when new blog is created', async () => {
    const mockCreateBlog = jest.fn()

    const element = render(<BlogForm createBlog={mockCreateBlog} />)

    const form = element.container.querySelector('.form')
    const input = element.container.querySelector('#form__input')

    fireEvent.change(input, {
        target: { value: 'Hello World!' }
    })
    fireEvent.click(form)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('Hello World!')
})