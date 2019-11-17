import React from 'react'
import { likeThe } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { createComment } from '../reducers/commentReducer'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, props }) => {
  const CommentForm = () => {
    const addComment = async (event) => {
      event.preventDefault()
      const commentObject = {
        content: event.target.content.value
      }
      props.createComment(blog[0].id, commentObject)
      props.setNotification(`a new comment '${commentObject.content}' added`, 5)
      event.target.content.value = ''
    }

    return (
      <div>
        <form onSubmit={addComment}>
          <div>
            <input name='content' required />
            <Button variant='secondary' type='submit'>add comment</Button>
          </div>
        </form>
      </div>
    )
  }

  const like = (id) => {
    props.likeThe(id)
    props.setNotification(`You voted '${blog[0].title}'`, 5)
  }

  if (blog[0] === undefined) {
    return null
  }

  return (
    <div>
      <h2>{blog[0].title} by {blog[0].author}</h2>
      <p><a href={blog[0].url}>{blog[0].url}</a></p>
      <p>{blog[0].likes} likes <Button variant='primary' onClick={() => like(blog[0].id)}>like</Button></p>
      <p>added by {blog[0].user.name}</p>
      <h3>comments</h3>
      <CommentForm />
      {blog[0].comments.map(comment =>
        <li key={comment.id}>{comment.content}</li>
      )}
    </div>
  )}

const mapDispatchToProps = {
  likeThe,
  setNotification,
  createComment
}

const ConnectedBlog = connect(
  null,
  mapDispatchToProps
)(Blog)

export default ConnectedBlog