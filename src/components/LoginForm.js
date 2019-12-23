import React from 'react'
import Notifications from './Notifications'
import PropTypes from 'prop-types'

// creates login form
const LoginForm = ({
  succesfulMessage,
  errorMessage,
  handleLogin,
  username,
  //handleUsernameChange,
  password,
  //handlePasswordChange
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
            {...username.withoutReset}
            //type="text"
            //value={username}
            //name="Username"
            //onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password
          <input
            {...password.withoutReset}
            //type="password"
            //value={password}
            //name="Password"
            //onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm