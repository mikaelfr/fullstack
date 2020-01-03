import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

const Login = (props) => {

  const [ name, setName ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ login ] = useMutation(LOGIN)

  const submit = async (e) => {
    e.preventDefault()

    const result = await login({
      variables: { username: name, password }
    })

    if (result) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('fullstack2019-library-user-token', token)
      props.setPage('authors')
    }

    props.onLogin()
    setName('')
    setPassword('')
  }

  if (!props.show) {
    return null
  }

  return(
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input 
            value={name}
            onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          password
          <input 
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login