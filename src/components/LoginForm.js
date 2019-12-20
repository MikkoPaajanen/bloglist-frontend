import React from 'react'
import Notifications from './Notifications'

// creates login form 
const LoginForm = ({
  succesfulMessage,
  errorMessage,
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange
  }) => {
  return (
    <div>
      <h2>Login</h2>
      <Notifications.Notification message={succesfulMessage} />
      <Notifications.ErrorNotification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          Username 
            <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            />
        </div>
        <div>
          Password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm