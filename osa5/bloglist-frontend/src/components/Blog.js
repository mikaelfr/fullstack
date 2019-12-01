import React, { useState } from 'react'
import blogsService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, getBlogs, getUser }) => {
  const [showExtra, setShowExtra] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async (event) => {
    event.preventDefault()
    await blogsService.addLike(blog)
    getBlogs()
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogsService.removeBlog(blog.id)
      getBlogs()
    }
  }

  const removeButtonStyle = () => { return { display: (getUser() && blog.user && getUser().username === blog.user.username) ? '' : 'none' } }

  const getBlogHtml = () => {
    if (showExtra) {
      return (
        <>
          {blog.title} {blog.author}<br/>
          <a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} {(blog.likes === 1) ? 'like' : 'likes'} <button onClick={addLike}>Like</button><br/>
          added by {(blog.user) ? blog.user.name : 'unknown'}<br/>
          <button style={removeButtonStyle()} onClick={removeBlog}>Remove</button>
        </>
      )
    }
    else {
      return (
        <>
          {blog.title} {blog.author}
        </>
      )
    }
  }

  return(
    <div data-testid='blogdiv' style={blogStyle} onClick={() => setShowExtra(!showExtra)}>
      {getBlogHtml()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  getBlogs: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
}

export default Blog