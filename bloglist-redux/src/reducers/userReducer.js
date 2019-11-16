/* eslint-disable no-case-declarations */
import userService from './../services/users'

export const setUser = (content) => {
  return async dispatch => {
    dispatch({
      type: 'USER_LOGIN',
      data: content
    })
  }
}

export const removeUser = () => {
  return async dispatch => {
    dispatch({
      type: 'USER_LOGOUT'
    })
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

const userReducer = (state = '', action) => {
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

export default userReducer