import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import userListReducer from './reducers/userListReducer'
import commentReducer from './reducers/commentReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  userList: userListReducer,
  user: userReducer,
  notification: notificationReducer,
  comment: commentReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store