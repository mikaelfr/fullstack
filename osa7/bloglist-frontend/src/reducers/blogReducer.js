import blogsService from '../services/blogs'

export const addLike = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogsService.addLike(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    const newBlog = await blogsService.create(title, author, url)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    const succeeded = await blogsService.removeBlog(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id, succeeded }
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogsService.addComment(id, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'UPDATE_BLOG':
    return state.map(a => a.id !== action.data.id ? a : action.data).sort((a, b) => b.likes - a.likes)

  case 'NEW_BLOG':
    return state.concat(action.data).sort((a, b) => b.likes - a.likes)

  case 'INIT_BLOGS':
    return action.data.sort((a, b) => b.likes - a.likes)

  case 'REMOVE_BLOG':
    return action.data.succeeded ? state.filter(a => a.id !== action.data.id).sort((a, b) => b.likes - a.likes) : state

  default:
    return state
  }
}

export default blogReducer