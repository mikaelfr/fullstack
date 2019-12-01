import React from 'react'
import blogsService from '../services/blogs'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const CreateBlog = ({ setSuccessMessage, setErrorMessage, getBlogs }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await blogsService.create(title.value, author.value, url.value)
      setSuccessMessage(`a new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      title.reset()
      author.reset()
      url.reset()

      getBlogs()
    }
    catch (ex) {
      setErrorMessage(ex.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
  setErrorMessage: PropTypes.func.isRequired,
  getBlogs: PropTypes.func.isRequired
}

export default CreateBlog