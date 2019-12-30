import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { setSuccessMessage, setErrorMessage } from '../reducers/notificationReducer'

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
      <form onSubmit={handleSubmit}>
        <div>
                    Title:
          <input {...title.transform()}/>
        </div>
        <div>
                    Author:
          <input {...author.transform()}/>
        </div>
        <div>
                    URL:
          <input {...url.transform()}/>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
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