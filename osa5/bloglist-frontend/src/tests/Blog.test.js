import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Blog from '../components/Blog'

afterEach(cleanup)

describe('blog list tests', () => {
  let component
  let mockFunction = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      user: { name: 'test name' },
      likes: 1
    }

    component = render(<Blog blog={blog} getBlogs={mockFunction} getUser={mockFunction} />)
  })

  test('blog shows title and author by default', () => {
    expect(component.container).toHaveTextContent('test title test author')
  })

  test('clicking the blog shows extra information', () => {
    const blogdiv = component.getByTestId('blogdiv')
    fireEvent.click(blogdiv)
    expect(component.container).toHaveTextContent(/test title test author/)
    expect(component.container).toHaveTextContent(/test url/)
    expect(component.container).toHaveTextContent(/1 like/)
    expect(component.container).toHaveTextContent(/added by test name/)
  })
})