import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Users = (props) => {
  if (props.userList.token !== undefined) return null

  return(
    <div>
      {props.userList.map(user =>
        <div key={user.id}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Blogs created</th>
                </tr>
                <tr>
                  <th><Link to={`/users/${user.id}`}><p>{user.name}</p></Link></th>
                  <th>{user.blogs.length}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList
  }
}

const ConnectedUsers = connect(
  mapStateToProps,
  null
)(Users)

export default ConnectedUsers