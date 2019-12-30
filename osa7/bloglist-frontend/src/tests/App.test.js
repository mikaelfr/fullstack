import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('../services/blogs')
import App from '../App'

describe('App integration', () => {
  test('if user is not logged, blogs are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('Login'))

    expect(component.queryByTestId('12345')).toBeNull()
    expect(component.queryByTestId('54321')).toBeNull()
  })

  test('if user is logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '123456789',
      name: 'Taster'
    }

    localStorage.setItem('loggedBlogUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('Logout'))

    expect(component.queryByTestId('12345')).toBeDefined()
    expect(component.queryByTestId('54321')).toBeDefined()
  })
})