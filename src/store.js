import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
