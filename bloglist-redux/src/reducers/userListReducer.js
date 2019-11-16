import userService from './../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

const userListReducer = (state = '', action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return action.data
    case 'USER_LOGOUT':
      return state
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export default userListReducer