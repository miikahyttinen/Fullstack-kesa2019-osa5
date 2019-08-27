import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = styled.button`
  background: Aquamarine;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 3px solid DeepPink;
  border-radius: 3px;
`

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={handlePasswordChange}
        />
      </div>
      <Button type='submit'>login</Button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
