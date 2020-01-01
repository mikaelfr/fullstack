import React from 'react'
import { connect } from 'react-redux'
import { addLike, removeBlog, addComment } from '../reducers/blogReducer'
import { setSuccessMessage, setErrorMessage } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { Button, Form, Table } from 'react-bootstrap'

const Blog = (props) => {
  const comment = useField('text')

  if (props.blog === undefined) {
    return null
  }

  const clickLike = (event) => {
    event.preventDefault()
    props.addLike(props.blog)
  }

  const clickRemoveBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}?`)) {
      props.removeBlog(props.blog.id)
      props.history.push('/')
    }
  }

  const removeButtonStyle = () => { return { display: (props.user && props.blog.user && props.user.username === props.blog.user.username) ? '' : 'none' } }

  const getComments = () => {
    if (props.blog.comments === undefined) {
      return null
    }

    return props.blog.comments.map((e, i) => <tr key={i}><th>{e}</th></tr>)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (comment.value.trim()) {
      props.addComment(props.blog.id, comment.value.trim())
      props.setSuccessMessage(`Comment '${comment.value.trim()}' added.`)
      comment.reset()
    }
    else {
      props.setErrorMessage('Comment must not be empty.')
      comment.reset()
    }
  }

  return (
    <>
        <h2>{props.blog.title} by {props.blog.author}</h2>
        <div>
          <a href={props.blog.url}>{props.blog.url}</a><br/>
          {props.blog.likes} {(props.blog.likes === 1) ? 'like' : 'likes'} <Button variant="success" size="sm" onClick={clickLike}>Like</Button><br/>
            added by {(props.blog.user) ? props.blog.user.name : 'unknown'}<br/>
          <Button variant="danger" size="sm" style={removeButtonStyle()} onClick={clickRemoveBlog}>Remove</Button>
        </div>
        <div>
          <h3>Comments</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control data-cy="comment-value" {...comment.transform()} />
              <Button data-cy="comment-submit" type="submit">Add comment</Button>
            </Form.Group>
          </Form>
          <Table striped>
            <tbody data-cy="comments-table">
              {getComments()}
            </tbody>
          </Table>
        </div>
    </>
  )
}

const mapStateToProps = (state, props) => {
  return {
    blog: state.blogs.filter(b => b.id === props.id)[0],
    user: state.user
  }
}

const mapDispatchToProps = {
  addLike,
  removeBlog,
  addComment,
  setSuccessMessage,
  setErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)