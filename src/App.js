import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async event => {
    event.preventDefault()

    if (newBlogTitle === '' || newBlogAuthor === '' || newBlogUrl === '') {
      setErrorMessage('Fill all fields to add a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    const blogToBeAdded = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    try {
      await blogService.create(blogToBeAdded)
      setSuccessMessage(`New blog ${newBlogTitle} added`)
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setTimeout(() => {
        setErrorMessage('Some error happened')
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setSuccessMessage('You have logged out')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <h1>Welcome to bloglist!</h1>
        <Notification message={successMessage} />
        <ErrorMessage message={errorMessage} />
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <form onSubmit={handleLogout}>
          <button type='submit'>LOGOUT</button>
        </form>
        <h2>Blogs</h2>
        <Notification message={successMessage} />
        <ErrorMessage message={errorMessage} />
        <br />
        <p> {user.name} is logged in </p>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} class='blog' />
        ))}
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>ADD BLOG</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            user={user}
            blogs={blogs}
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
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return loginForm()
  } else {
    return blogForm()
  }
}

export default App
