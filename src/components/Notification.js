import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  if (props.notification.messageType === 'success') {
    return <div className='message-success'>{props.notification.message}</div>
  }
  if (props.notification.messageType === 'error') {
    return <div className='message-error'>{props.notification.message}</div>
  } else {
    return <div />
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
