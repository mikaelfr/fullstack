import React from 'react'
import { useQuery } from 'react-apollo'
import { ALL_BOOKS_QUERY } from './Books'

const Recommendations = (props) => {
  const books = useQuery(ALL_BOOKS_QUERY)
  const data = props.me.data

  if (!props.show || !data.me || props.me.loading || books.loading) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{data.me.favoriteGenre}</strong></p>
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
            {(books.data.allBooks) ? books.data.allBooks.filter(e => e.genres.includes(data.me.favoriteGenre)).map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ) : null}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations