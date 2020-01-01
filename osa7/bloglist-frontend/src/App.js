import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import loginService from './services/login'
import blogsService from './services/blogs'

import { setSuccessMessage, setErrorMessage } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'

import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import Blogs from './components/Blogs'

const App = (props) => {
  const loginFormRef = React.createRef()

  const initBlogsEffect = props.initBlogs
  const initUsersEffect = props.initUsers
  const setUserEffect = props.setUser

  useEffect(() => {
    initBlogsEffect()
    initUsersEffect()
  }, [initBlogsEffect, initUsersEffect])

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

  const blogDisplay = () => {
    if (props.user !== null && props.blogs !== null) {
      return(
        <div>
          <Togglable buttonLabel="New blog">
            <CreateBlog />
          </Togglable>
          <Blogs />
        </div>
      )
    }
  }

  return (
    <div className="container">
      <Router>
        <div className="App">
          <Navigation />

          <h1>Blogs</h1>

          <Notification type="success" />
          <Notification type="danger" />

          <Login handleLogin={handleLogin} ref={loginFormRef} />

          <Route exact path="/" render={() => blogDisplay()} />
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/users/:id" render={({ match }) => <User id={match.params.id} />} />
          <Route exact path="/blogs/:id" render={({ match, history }) => <Blog id={match.params.id} history={history} />} />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(mapStateToProps, { setSuccessMessage, setErrorMessage, initBlogs, initUsers, setUser })(App)
