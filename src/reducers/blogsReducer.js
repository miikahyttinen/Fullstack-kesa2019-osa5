import blogsService from '../services/blogsService'

const asObject = Blog => {
  return {
    content: Blog,
    votes: 0
  }
}

export const createBlog = content => {
  const newBlog = {
    title: content.title,
    author: content.author,
    url: content.url,
    likes: 0
  }
  return async dispatch => {
    await blogsService.create(newBlog)
    dispatch({
      type: 'CREATE',
      content: content.newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const Blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT',
      content: Blogs
    })
  }
}

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(asObject(action.content))
    case 'INIT':
      return state.concat(action.content)
    default:
      return state
  }
}

export default blogsReducer
