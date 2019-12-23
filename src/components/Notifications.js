import React from 'react'

// renders a notification if operation is succesful
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="succesful">{message}</div>
  )
}

// renders an error notification if operation is not succesful
const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">{message}</div>
  )
}

export default { Notification, ErrorNotification }