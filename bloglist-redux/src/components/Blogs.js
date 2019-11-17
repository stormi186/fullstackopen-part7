import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './../components/BlogForm'
import Togglable from './../components/Togglable'
import { Table } from 'react-bootstrap'

const Blogs = (props) => {

  return(
    <div className="container">
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      <Table striped>
        <tbody>
          {props.blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}><p>{blog.title} by {blog.author}</p></Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users
  }
}

const ConnectedBlogs = connect(
  mapStateToProps,
  null
)(Blogs)

export default ConnectedBlogs