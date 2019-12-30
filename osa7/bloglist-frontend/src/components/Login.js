import React, { useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { connect } from 'react-redux'

const Login = React.forwardRef((props, ref) => {
  const username = useField('text')
  const password = useField('password')

  useImperativeHandle(ref, () => {
    return { username, password }
  })

  const loginForm = () => (
        <>
            <h2>Log in to application</h2>
            <form onSubmit={props.handleLogin}>
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
      <p>{props.user.name} logged in<button onClick={props.handleLogout}>Logout</button></p>
    </div>
  )

  return(
        <>
            {props.user === null ? loginForm() : displayUser()}
        </>
  )
})

Login.displayName = 'Login'

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(Login)