import React, { useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const Login = React.forwardRef((props, ref) => {
  const username = useField('text')
  const password = useField('password')

  useImperativeHandle(ref, () => {
    return { username, password }
  })

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={props.handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control data-cy="login-username" {...username.transform()}/>
          <Form.Label>Password</Form.Label>
          <Form.Control data-cy="login-password" {...password.transform()}/>
          <Button variant="primary" type="submit" data-cy="login-submit">Login</Button>
        </Form.Group>
      </Form>
    </div>
  )

  return(
    <>
      {props.user === null ? loginForm() : null}
    </>
  )
})

Login.displayName = 'Login'

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(Login)