import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const getMessage = () => {
    return props.type === 'success' ? props.success : props.error
  }

  if (!getMessage()) {
    return null
  }

  return (
    <div className={props.type}>
      {getMessage()}
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