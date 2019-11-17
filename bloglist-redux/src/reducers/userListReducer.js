import userService from './../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const userList = await userService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: userList
    })
  }
}

const userListReducer = (state = '', action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export default userListReducer