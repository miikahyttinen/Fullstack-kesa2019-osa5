import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogsService'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { connect } from 'react-redux'
import { useField } from './hooks'
import './App.css'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogsReducer'
import userService from './services/userService'
import Users from './components/Users'
import styled from 'styled-components'

const Page = styled.div`
  padding: 1em;
  background: LightYellow;
  text-align: center;
`

const Button = styled.button`
  background: Aquamarine;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 3px solid DeepPink;
  border-radius: 3px;
`

const App = props => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [users, setUsers] = useState('')

  useEffect(() => {
    userService.getAll().then(res => setUsers(res))
  }, [])

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  const sendNotificationToStore = (messageType, message) => {
    props.createNotification({ messageType: messageType, message: message })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    const usernameLogin = username.value
    const passwordLogin = password.value
    try {
      const user = await loginService.login({
        usernameLogin,
        passwordLogin
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      username.reset()
      password.reset()
      blogsService.setToken(user.token)
    } catch (exception) {
      sendNotificationToStore('error', 'wrong credentials')
      setTimeout(() => {
        sendNotificationToStore('initial', '')
      }, 5000)
    }
  }

  const addBlog = async event => {
    event.preventDefault()

    if (newBlogTitle === '' || newBlogAuthor === '' || newBlogUrl === '') {
      sendNotificationToStore('error', 'Fill all fields to add a new blog')
      setTimeout(() => {
        sendNotificationToStore('initial', '')
      }, 5000)
      return
    }

    const blogToBeAdded = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    try {
      props.createBlog(blogToBeAdded)
      sendNotificationToStore('success', `New blog ${newBlogTitle} added`)
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      setTimeout(() => {
        sendNotificationToStore('initial', '')
      }, 5000)
    } catch (exception) {
      setTimeout(() => {
        sendNotificationToStore('error', 'Some error happened')
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    sendNotificationToStore('success', 'You have logged out')
    setTimeout(() => {
      sendNotificationToStore('initial', '')
    }, 5000)
  }

  const userList = () => {
    return <Users users={users} blogs={props.blogs} />
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <Page>
        <div>
          <h1>Welcome to bloglist!</h1>
          <Notification />
          <div style={hideWhenVisible}>
            <Button onClick={() => setLoginVisible(true)}>log in</Button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              handleLogin={handleLogin}
              username={username.value}
              password={password.value}
              handleUsernameChange={username.onChange}
              handlePasswordChange={password.onChange}
            />
            <Button onClick={() => setLoginVisible(false)}>cancel</Button>
          </div>
        </div>
      </Page>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <Page>
        <form onSubmit={handleLogout}>
          <Button type='submit'>LOGOUT</Button>
        </form>
        <h2>Blogs</h2>
        <Notification />
        <br />
        <p> {user.name} is logged in </p>
        <div>
          {props.blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog, index) => (
              <Blog key={index} blog={blog} class='blog' />
            ))}
        </div>
        <div style={hideWhenVisible}>
          <Button onClick={() => setBlogFormVisible(true)}>ADD BLOG</Button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            user={user}
            blogs={props.blogs}
            addBlog={addBlog}
            newBlogTitle={newBlogTitle}
            handleNewBlogTitleChange={({ target }) =>
              setNewBlogTitle(target.value)
            }
            newBlogAuthor={newBlogAuthor}
            handleNewBlogAuthorChange={({ target }) =>
              setNewBlogAuthor(target.value)
            }
            newBlogUrl={newBlogUrl}
            handleNewBlogUrlChange={({ target }) => setNewBlogUrl(target.value)}
          />
          <Button onClick={() => setBlogFormVisible(false)}>cancel</Button>
        </div>
        <div>{userList()}</div>
      </Page>
    )
  }

  if (user === null) {
    return loginForm()
  } else {
    return blogForm()
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { initializeBlogs, createBlog, createNotification }
)(App)
