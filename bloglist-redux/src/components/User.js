import React from 'react'

const User = ({ user }) => {

  if ( user === undefined || user[0] === undefined) {
    return null
  }

  return (
    <div>
      <h2>{user[0].name}</h2>
      <h3>added blogs</h3>
      {user[0].blogs.map(blog =>
        <li key={blog.id}>{blog.title}</li>
      )}
    </div>
  )}


export default User