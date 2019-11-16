import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from './../services/login'
import blogService from './../services/blogs'

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      props.setUser(user)
      props.setNotification('successful login', 5)
    } catch (exception) {
      props.setNotification('wrong username and/or password', 5)
      event.target.username.value = ''
      event.target.password.value = ''
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="login">
        <h1>log in to application</h1>
        <div>
          username
          <input name='username' required />
        </div>
        <div>
          password
          <input name='password' type='password' required />
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  setUser,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)
