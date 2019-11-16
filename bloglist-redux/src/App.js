import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  BrowserRouter as Router,
  Route, Link, withRouter, Switch
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { likeThe } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/userListReducer'
import { createComment } from './reducers/commentReducer'

const loggedInHeader = ({ props }) => {
  const padding = { padding: 5 }

  const blogById = (id) => {
    return props.blogs.filter(blog => blog.id === id)
  }
  const userById = (id) => {
    if (props.userList.token !== undefined) return undefined
    return props.userList.filter(user => user.id === id)
  }
  const handleLogout = () => {
    props.removeUser()
    props.history.push('/')
    window.localStorage.clear()
    window.location.reload(false)
  }
  return(
    <div>
      <Notification />
      <Router>
        <div>
          <div>
            <Link style={padding} to="/blogs">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            {props.user
              ? <p><em>{props.user.name} logged in</em><button type="submit" onClick={handleLogout}>logout</button></p>
              : <Link to="/login">login</Link>
            }
            <h2>blog app</h2>
          </div>
          <div>
            <Switch>
              <Route exact path="/" render={() => <Blogs />} />
              <Route exact path="/blogs" render={() => <Blogs />} />
              <Route exact path="/blogs/:id" render={({ match }) =>
                <Blog blog={blogById(match.params.id)} props={props}/>
              } />
              <Route exact path="/users" render={() => <Users />} />
              <Route exact path="/users/:id" render={({ match }) =>
                <User user={userById(match.params.id)} />
              } />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  )
}

const App = (props) => {
  useEffect(() => {
    props.initializeBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.initializeUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loginForm = () => (
    <LoginForm />
  )

  return (
    <div>
      {window.localStorage.getItem('loggedBlogAppUser') === null && loginForm()}
      {window.localStorage.getItem('loggedBlogAppUser') !== null && loggedInHeader({ props })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userList: state.userList,
    blogs: state.blogs
  }
}

export default compose(
  withRouter, connect(
    mapStateToProps, { initializeBlogs, initializeUsers, setNotification, setUser, removeUser, likeThe, createComment }
  ))(App)