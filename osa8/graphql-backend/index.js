const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'epicrapbattlestylewin'

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect('mongodb+srv://fullstack:fullstacksafepassword@cluster0-vvk6k.mongodb.net/library?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const pubsub = new PubSub()

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const getGenreFilter = (args) => args.genre ? { genres: { $in: [ args.genre ] } } : {}

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => await Book.find(getGenreFilter(args)).populate('author'),
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('Invalid token')
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        const authorObj = new Author({ name: args.author })
        try {
          author = await authorObj.save()
        }
        catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })
      
      try {
        await book.save()
      }
      catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      const populatedBook = await Book.populate(book, 'author')

      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

      return populatedBook
    },
    editAuthor: (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('Invalid token')
      }

      return Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true }).catch(error => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save().catch(error => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username })

        // extreme safety measures
        if (!user || args.password !== 'password') {
          throw new UserInputError('Wrong credentials', { invalidArgs: args })
        }

        const userForToken = {
          username: user.username,
          id: user._id
        }

        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
      catch (error) {
        throw new UserInputError('User does not exist.', { invalidArgs: args })
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([ 'BOOK_ADDED' ])
    }
  },
  Author: {
    bookCount: async (root) => await Book.find({ author: root._id }).countDocuments()
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      return { currentUser: await User.findById(decodedToken.id) }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
