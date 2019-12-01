import React, { useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const Login = React.forwardRef(({ handleLogin, handleLogout, user }, ref) => {
  const username = useField('text')
  const password = useField('password')

  useImperativeHandle(ref, () => {
    return { username, password }
  })

  const loginForm = () => (
        <>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
              <div>
                    Username
                <input {...username.transform()}/>
              </div>
              <div>
                    Password
                <input {...password.transform()}/>
              </div>
              <div>
                <button type="submit">Login</button>
              </div>
            </form>
        </>
  )

  const displayUser = () => (
    <div>
      <p>{user.name} logged in<button onClick={handleLogout}>Logout</button></p>
    </div>
  )

  return(
        <>
            {user === null ? loginForm() : displayUser()}
        </>
  )
})

Login.displayName = 'Login'

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default Login