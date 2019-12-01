import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Login from './components/Login'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogsService from './services/blogs'

import './index.css'

function App() {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)

  const loginFormRef = React.createRef()

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const getBlogs = async () => {
    const response = await blogsService.getAll()
    response.sort((a,b) => b.likes - a.likes)
    setBlogs(response)
  }

  const getUser = () => user

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username: loginFormRef.current.username.value, password: loginFormRef.current.password.value })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
    }
    catch (ex) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload()
  }

  const blogDisplay = () => {
    if (user !== null && blogs !== null) {
      return(
        <div>
          <Togglable buttonLabel="New note">
            <CreateBlog
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
              getBlogs={getBlogs}
            />
          </Togglable>
          {blogs.map(blog => <Blog data-testid={blog.id} key={blog.id} blog={blog} getBlogs={getBlogs} getUser={getUser} />)}
        </div>
      )
    }
  }

  return (
    <div className="App">
      <h1>Blogs</h1>

      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />

      <Login handleLogin={handleLogin} handleLogout={handleLogout} user={user} ref={loginFormRef} />

      {blogDisplay()}
    </div>
  )
}

export default App
