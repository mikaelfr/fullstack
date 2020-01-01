import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  const getMessage = () => {
    return props.type === 'success' ? props.success : props.error
  }

  if (!getMessage()) {
    return null
  }

  return (
    <div>
      <Alert variant={props.type}>
        {getMessage()}
      </Alert>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    success: state.notification.success,
    error: state.notification.error
  }
}

export default connect(mapStateToProps)(Notification)