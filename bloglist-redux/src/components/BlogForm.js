import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    }
    props.createBlog(blogObject)
    props.setNotification(`a new blog '${blogObject.title} by '${blogObject.author}' added`, 5)
    event.target.author.value = ''
    event.target.title.value = ''
    event.target.url.value = ''
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title:
          <input name='title' required />
        </div>
        <div>
          author:
          <input name='author' required />
        </div>
        <div>
          url:
          <input name='url' required />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)
