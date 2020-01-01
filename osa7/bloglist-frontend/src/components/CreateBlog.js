import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { setSuccessMessage, setErrorMessage } from '../reducers/notificationReducer'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const CreateBlog = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (title.value && url.value) {
      props.createBlog(title.value, author.value, url.value)
      props.setSuccessMessage(`a new blog ${title.value} by ${author.value} added`)

      title.reset()
      author.reset()
      url.reset()
    }
    else {
      props.setErrorMessage('Title and Url are required.')
    }
  }

  return(
    <div>
      <h2>Create new</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control data-cy="add-title" {...title.transform()}/>
          <Form.Label>Author:</Form.Label>
          <Form.Control data-cy="add-author" {...author.transform()}/>
          <Form.Label>URL:</Form.Label>
          <Form.Control data-cy="add-url" {...url.transform()}/>
          <Button variant="primary" type="submit" data-cy="add-submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

CreateBlog.propTypes = {
  setSuccessMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  createBlog,
  setSuccessMessage,
  setErrorMessage
}

export default connect(null, mapDispatchToProps)(CreateBlog)