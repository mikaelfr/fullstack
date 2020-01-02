import React, { useState } from 'react'
import { useQuery, useSubscription } from 'react-apollo'
import { gql } from 'apollo-boost'

export const ALL_BOOKS_QUERY = gql`
{
  allBooks {
    id
    title
    author {
      id
      name
      bookCount
    }
    published
    genres
  }
}
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        id
        name
        bookCount
      }
      published
      genres
    }
  }
`

const Books = (props) => {
  const books = useQuery(ALL_BOOKS_QUERY)
  const [ filter, setFilter ] = useState('')

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      window.alert(`A new book '${book.title}' by ${book.author.name} added.`)
      props.updateCacheWith(book)
    }
  })

  if (!props.show) {
    return null
  }

  const genreView = () => {
    const genres = books.data.allBooks.map(e => e.genres).flat()
    const distinctGenres = [...new Set(genres)]
    return (
      <div>
        {distinctGenres.map(e => <button key={e} onClick={() => setFilter(e)}>{e}</button>)}
        <button onClick={() => setFilter('')}>all genres</button>
      </div>
      )
  }

  const getFilteredBooks = () => {
    return filter ? books.data.allBooks.filter(e => e.genres.includes(filter)) : books.data.allBooks
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
            {(books.data.allBooks) ? getFilteredBooks().map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ) : null}
        </tbody>
      </table>
      {genreView()}
    </div>
  )
}

export default Books