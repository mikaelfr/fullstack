import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (title, author, url) => {
  const config = {
    headers: { Authorization: token }
  }

  const newObject = {
    'title': title,
    'author': author,
    'url': url
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const newBlog = {
    'user': (blog.user) ? blog.user.id : null,
    'likes': blog.likes + 1,
    'author': blog.author,
    'title': blog.title,
    'url': blog.url
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config)
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.status === 204
}

export default { getAll, create, addLike, removeBlog, setToken }