/* eslint-disable no-case-declarations */
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

const userReducer = (state = '', action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return action.data
    case 'USER_LOGOUT':
      return ''
    default:
      return state
  }
}

export default userReducer