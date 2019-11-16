/* eslint-disable no-case-declarations */
import commentService from './../services/comments'

export const createComment = (id, commentObject) => {
  return async dispatch => {
    const newComment = await commentService.create(id, commentObject)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment,
    })
  }
}

const commentReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_COMMENT':
      return [...state, action.data]
    default:
      return state
  }
}

export default commentReducer