const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200).expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('identifier field is called id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('adding a valid blog works', async () => {
  const newBlog = {
    'title': 'Test blog 3',
    'author': 'Testi dude',
    'url': 'testing',
    'likes': 5
  }

  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

  const response = await helper.blogsInDb()
  const urls = response.map(r => r.url)

  expect(response.length).toBe(helper.initialBlogs.length + 1)
  expect(urls).toContain('testing')
})

test('if likes is empty, the value will be set to 0', async () => {
  await Blog.deleteMany({})

  const newBlog = {
    'title': 'Test blog 3',
    'author': 'Testi dude',
    'url': 'testing'
  }

  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

  const response = await helper.blogsInDb()

  expect(response.length).toBe(1)
  expect(response[0].likes).toBe(0)
})

test('if title and url is empty, response is 400', async () => {
  const newBlog = {
    'author': 'Testi dude',
    'likes': 5
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('deleting succeeds with 204', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

  const urls = blogsAtEnd.map(b => b.url)
  expect(urls).not.toContain(blogToDelete.url)
})

test('updating succeeds with 200', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const newBlog = new Blog({
    ...blogToUpdate,
    likes: blogToUpdate.likes + 2
  })

  const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200)
  expect(response.body.likes).toBe(blogToUpdate.likes + 2)

  const blogAtEnd = await api.get(`/api/blogs/${blogToUpdate.id}`)
  expect(blogAtEnd.body.likes).toBe(blogToUpdate.likes + 2)
})

afterAll(() => {
  mongoose.connection.close()
})