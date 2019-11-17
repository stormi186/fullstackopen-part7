import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

const Users = (props) => {
  if (props.userList === undefined) return null

  return(
    <div className="container">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.userList.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}><p>{user.name}</p></Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
    user: state.user
  }
}

const ConnectedUserList = connect(
  mapStateToProps,
  null
)(Users)

export default ConnectedUserList