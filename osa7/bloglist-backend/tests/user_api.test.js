const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('user validity', () => {
  test('rejected no password', async () => {
    const invalidUser = {
      name: 'kfjdsl',
      username: 'klfdjkf'
    }

    const response = await api.post('/api/users').send(invalidUser).expect(400)
    expect(response.body.error).toEqual('Password should be at least 3 characters long')

    const users = await helper.usersInDb()
    expect(users.length).toBe(helper.initialUsers.length)
  })

  test('rejected short password', async () => {
    const invalidUser = {
      name: 'kfjdsl',
      username: 'klfdjkf',
      password: 'kj'
    }

    const response = await api.post('/api/users').send(invalidUser).expect(400)
    expect(response.body.error).toEqual('Password should be at least 3 characters long')

    const users = await helper.usersInDb()
    expect(users.length).toBe(helper.initialUsers.length)
  })

  test('rejected no username', async () => {
    const invalidUser = {
      name: 'kfjdsl',
      password: 'kjfdsf'
    }

    const response = await api.post('/api/users').send(invalidUser).expect(400)
    expect(response.body.error).toEqual('User validation failed: username: Path `username` is required.')

    const users = await helper.usersInDb()
    expect(users.length).toBe(helper.initialUsers.length)
  })

  test('rejected short username', async () => {
    const invalidUser = {
      name: 'kfjdsl',
      username: 'ks',
      password: 'kjfds'
    }

    const response = await api.post('/api/users').send(invalidUser).expect(400)
    expect(response.body.error).toEqual(`User validation failed: username: Path \`username\` (\`${invalidUser.username}\`) is shorter than the minimum allowed length (3).`)

    const users = await helper.usersInDb()
    expect(users.length).toBe(helper.initialUsers.length)
  })

  test('rejected non unique username', async () => {
    const invalidUser = {
      name: 'kfjdsl',
      username: 'Test',
      password: 'kjfsdfs'
    }

    const response = await api.post('/api/users').send(invalidUser).expect(400)
    expect(response.body.error).toEqual(`User validation failed: username: Error, expected \`username\` to be unique. Value: \`${invalidUser.username}\``)

    const users = await helper.usersInDb()
    expect(users.length).toBe(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})