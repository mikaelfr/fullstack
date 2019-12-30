import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const [showExtra, setShowExtra] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event) => {
    event.preventDefault()
    props.addLike(props.blog)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}?`)) {
      props.removeBlog(props.blog.id)
    }
  }

  const removeButtonStyle = () => { return { display: (props.user && props.blog.user && props.user.username === props.blog.user.username) ? '' : 'none' } }

  const getBlogHtml = () => {
    if (showExtra) {
      return (
        <>
          {props.blog.title} {props.blog.author}<br/>
          <a href={props.blog.url}>{props.blog.url}</a><br/>
          {props.blog.likes} {(props.blog.likes === 1) ? 'like' : 'likes'} <button onClick={addLike}>Like</button><br/>
          added by {(props.blog.user) ? props.blog.user.name : 'unknown'}<br/>
          <button style={removeButtonStyle()} onClick={removeBlog}>Remove</button>
        </>
      )
    }
    else {
      return (
        <>
          {props.blog.title} {props.blog.author}
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
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  addLike,
  removeBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)