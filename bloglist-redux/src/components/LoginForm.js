import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from './../services/login'
import blogService from './../services/blogs'
import { Form, Button } from 'react-bootstrap'
import { initializeUsers } from '.././reducers/userListReducer'

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value
      })
      blogService.setToken(user.token)
      props.setNotification('successful login', 5)
      props.setUser(user)
    } catch (exception) {
      props.setNotification('wrong username and/or password', 5)
      event.target.username.value = ''
      event.target.password.value = ''
    }
  }

  return (
    <div className='container'>
      <Form onSubmit={handleLogin} className='login'>
        <h1>log in to application</h1>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type='text' name='username' required />
          <Form.Label>password</Form.Label>
          <Form.Control name='password' type='password' required />
          <Button variant='primary' type='submit'>login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser,
  setNotification,
  initializeUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
