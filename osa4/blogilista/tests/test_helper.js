const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Test blog',
    author: 'Testi jäbä',
    url: 'test-blog',
    likes: 10
  },
  {
    title: 'Test blog 2',
    author: 'Testi jäbä',
    url: 'test-blog2',
    likes: 2
  }
]

const initialUsers = [
  {
    name: 'Testi jäbä',
    username: 'Test',
    password: 'nicememe'
  },
  {
    name: 'Cant type',
    username: 'Nicebrain',
    password: 'sorry'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}