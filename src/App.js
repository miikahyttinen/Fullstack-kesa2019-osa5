import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
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
    window.localStorage.removeItem('loggedBlogAppUser')
    setSuccessMessage('You have logged out')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <Notification message={successMessage} />
      <Error message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      <form onSubmit={handleLogout}>
        <button type='submit'>LOGOUT</button>
      </form>
      <p> {user.name} is logged in </p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <br />
      <Notification message={successMessage} />
      <Error message={errorMessage} />
      <form onSubmit={addBlog}>
        Title:
        <input
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />{' '}
        <br />
        Author:
        <input
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
        <br />
        Url:
        <input
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
        <br />
        <button type='submit'>Save</button>
      </form>
    </div>
  )

  if (user === null) {
    return loginForm()
  } else {
    return blogForm()
  }
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className='message-success'>{message}</div>
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className='message-error'>{message}</div>
}

export default App
