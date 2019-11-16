/* eslint-disable no-case-declarations */
import blogService from './../services/blogs'

export const likeThe = (id) => {
  return {
    type: 'LIKE',
    data: { id }
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE':
      const id = action.data.id
      const blogToLike = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      blogService.update(id, changedBlog)
      return state.map(blog =>
        blog.id !== id ? blog: changedBlog
      ).sort((a, b) => (a.likes < b.likes) ? 1 : -1)
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export default blogReducer