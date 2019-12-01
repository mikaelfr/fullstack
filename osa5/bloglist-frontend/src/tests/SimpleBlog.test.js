import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'

afterEach(cleanup)

test('renders blog title, author and likes', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 2
  }

  const mockOnClick = jest.fn()

  const component = render(<SimpleBlog blog={blog} onClick={mockOnClick} />)

  const titleauthor = component.container.querySelector('.titleauthor')
  expect(titleauthor).toHaveTextContent('test title test author')
  const likes = component.container.querySelector('.likes')
  expect(likes).toHaveTextContent('blog has 2 likes')
})

test('like fires once per click', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 2
  }

  const mockOnClick = jest.fn()

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockOnClick} />)

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockOnClick.mock.calls.length).toBe(2)
})