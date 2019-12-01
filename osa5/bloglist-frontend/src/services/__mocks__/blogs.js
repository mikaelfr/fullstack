const blogs = [
  {
    id: '12345',
    title: 'test title',
    author: 'test author',
    url: 'test url',
    user: { name: 'test name', username: 'testuser1' },
    likes: 1
  },
  {
    id: '54321',
    title: 'test title 2',
    author: 'test author 2',
    url: 'test url 2',
    user: { name: 'test name 2', username: 'testuser1' },
    likes: 2
  }
]

const getAll = () => Promise.resolve(blogs)

const setToken = () => null

export default { getAll, setToken }