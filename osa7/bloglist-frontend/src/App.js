import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Login from './components/Login'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import { connect } from 'react-redux'

import loginService from './services/login'
import blogsService from './services/blogs'

import { setSuccessMessage, setErrorMessage } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import './index.css'

const App = (props) => {
  const loginFormRef = React.createRef()

  const initBlogsEffect = props.initBlogs
  const setUserEffect = props.setUser

  useEffect(() => {
    initBlogsEffect()
  }, [initBlogsEffect])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUserEffect(user)
      blogsService.setToken(user.token)
    }
  }, [setUserEffect])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username: loginFormRef.current.username.value, password: loginFormRef.current.password.value })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      props.setUser(user)
    }
    catch (ex) {
      props.setErrorMessage('Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload()
  }

  const blogDisplay = () => {
    if (props.user !== null && props.blogs !== null) {
      return(
        <div>
          <Togglable buttonLabel="New note">
            <CreateBlog />
          </Togglable>
          {props.blogs.map(blog => <Blog data-testid={blog.id} key={blog.id} blog={blog} />)}
        </div>
      )
    }
  }

  return (
    <div className="App">
      <h1>Blogs</h1>

      <Notification type="success" />
      <Notification type="error" />

      <Login handleLogin={handleLogin} handleLogout={handleLogout} ref={loginFormRef} />

      {blogDisplay()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(mapStateToProps, { setSuccessMessage, setErrorMessage, initBlogs, setUser })(App)
