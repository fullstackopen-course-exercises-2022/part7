import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    const blog = {
        title: 'Getting Started with MERN Stack',
        author: 'Prakash Mahat',
        url: 'https://medium.com/towardsdev/getting-started-with-mern-stack-5eef5dc0e992',
        likes: 16
    }
    test('renders title and author', () => {

        const element = render(<Blog blog={blog} />)

        // const blogDiv = container.querySelector('.blog')
        expect(element.container).toHaveTextContent('Getting Started with MERN Stack')
    })

    test('like button called twice', async () => {
        const mockLikeHandler = jest.fn()
        render(<Blog blog={blog} updateBlog={mockLikeHandler} />)
        const user = userEvent.setup()
        const btnLike = screen.getByText('Like')
        await user.click(btnLike)
        await user.click(btnLike)
        expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })

    test('blogs url and number of likes shown', async () => {
        const mockHandler = jest.fn()

        render(<Blog blog={blog} viewRef={mockHandler} />)

        const user = userEvent.setup()
        const btnReveal = screen.getByText('View')
        await user.click(btnReveal)

        expect(mockHandler.mock.calls).toHaveLength(3)
    })
})
