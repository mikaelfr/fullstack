import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import { gql } from 'apollo-boost'
import Select from 'react-select'

export const ALL_AUTHORS_QUERY = gql`
{
  allAuthors {
    id
    name
    born
    bookCount
  }
}
`

export const EDIT_AUTHOR = gql`
mutation modifyBirthyear($name: String!, $year: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $year,
  ) {
    id
    name
    born
    bookCount
  }
}
`

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS_QUERY)

  const [name, setName] = useState(null)
  const [year, setYear] = useState('')

  if (!props.show || !authors.data) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()

    if (!name) {
      return 
    }

    try {
      await props.editBirthyear({
        variables: { name: name.value, year: Number(year) }
      })
    } 
    catch (error) {
      console.log(error)
    }
    
    setName(null)
    setYear('')
  }

  const getAuthors = () => authors.data.allAuthors ? authors.data.allAuthors : []

  const getOptions = () => getAuthors().map(e => { return { value: e.name, label: e.name } })

  const getBirthYearDiv = () => (
    <div>
      <h3>Set birthyear</h3>
      <Select
        value={name}
        onChange={o => setName(o)}
        options={getOptions()} 
        placeholder={'Select author to modify'}
      />
      <form onSubmit={submit}>
        <div>
          born
          <input
            value={year}
            type='number'
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {getAuthors().map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
        </tbody>
      </table>
      {props.token ? getBirthYearDiv() : null}
    </div>
  )
}

export default Authors