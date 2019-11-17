import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

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
    <div className='container'>
      <Form onSubmit={addBlog} className='blog'>
        <h3>create new</h3>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' name='title' required />
          <Form.Label>Author</Form.Label>
          <Form.Control type='text' name='author' required />
          <Form.Label>URL</Form.Label>
          <Form.Control type='text' name='url' required />
          <Button variant='primary' type='submit'>Create</Button>
        </Form.Group>
      </Form>
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
