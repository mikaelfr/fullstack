import React, { useState, useEffect } from 'react'
import Authors, { ALL_AUTHORS_QUERY, EDIT_AUTHOR } from './components/Authors'
import Books, { ALL_BOOKS_QUERY } from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useMutation, useApolloClient } from 'react-apollo'
import { gql } from 'apollo-boost'
import Recommendations from './components/Recommendations'

const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    id
    title
    published
    author {
      id
      name
      bookCount
    }
  }
}
`

const App = () => {
  const client = useApolloClient()

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('fullstack2019-library-user-token')
    setToken(token)
  }, [])

  const includedIn = (set, object) => set.map(p => p.id).includes(object.id)

  const updateCacheWith = (addedBook) => {
    const booksInStore = client.readQuery({ query: ALL_BOOKS_QUERY })
      
    if (!includedIn(booksInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS_QUERY,
        data: { allBooks: booksInStore.allBooks.concat(addedBook) }
      })
    }

    const authorsInStore = client.readQuery({ query: ALL_AUTHORS_QUERY })
    if (!includedIn(authorsInStore.allAuthors, addedBook.author)) {
      addedBook.author.born = null
      client.writeQuery({
        query: ALL_AUTHORS_QUERY,
        data: { allAuthors: authorsInStore.allAuthors.concat(addedBook.author) }
      })
    }
    else { // update bookCount
      const authorInStore = authorsInStore.allAuthors.filter(e => e.id === addedBook.author.id)[0]

      client.writeQuery({
        query: ALL_AUTHORS_QUERY,
        data: { allAuthors: authorsInStore.allAuthors.map(e => (e.id === authorInStore.id) ? authorInStore : e) }
      })
    }
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  const [editBirthyear] = useMutation(EDIT_AUTHOR, {
    update: (store, response) => {
      const editedAuthor = response.data.editAuthor
      const authorsInStore = client.readQuery({ query: ALL_AUTHORS_QUERY })

      client.writeQuery({
        query: ALL_AUTHORS_QUERY,
        data: { allAuthors: authorsInStore.allAuthors.map(e => (e.id === editedAuthor.id) ? editedAuthor : e) }
      })
    }
  })

  const loggedInView = () => (
    <>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => setPage('recommended')}>recommended</button>
      <button onClick={logout}>logout</button>
    </>
  )

  const loggedOutView = () => (
    <button onClick={() => setPage('login')}>login</button>
  )

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? loggedInView() : loggedOutView()}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
        editBirthyear={editBirthyear}
      />

      <Books
        show={page === 'books'}
        updateCacheWith={updateCacheWith}
      />
     
      <NewBook 
        show={page === 'add'} 
        addBook={addBook} 
      />

      <Recommendations
        show={page === 'recommended'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
      
    </div>
  )
}

export default App