import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './../components/BlogForm'
import Togglable from './../components/Togglable'

const Blogs = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return(
    <div>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      {props.blogs.map(blog =>
        <div key={blog.id}>
          <div style={style}>
            <Link to={`/blogs/${blog.id}`}><p>{blog.title} by {blog.author}</p></Link>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const ConnectedBlogs = connect(
  mapStateToProps,
  null
)(Blogs)

export default ConnectedBlogs