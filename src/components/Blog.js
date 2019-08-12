import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }
  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }

  return (
    <div className='blog-content'>
      <div>
        {blog.title} {blog.author}{' '}
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogInfoVisible(true)}>Show info</button>
          <button onClick={() => blogService.likeOne(blog)}>Like</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        Author: {blog.author}
        <br />
        Url: {blog.url}
        <br />
        Likes: {blog.likes}
        <br />
        Added by: {blog.user.name}
        <br />
        <button onClick={() => setBlogInfoVisible(false)}>Close info</button>
        <button onClick={() => blogService.likeOne(blog)}>Like</button>
        <button
          className='delete-button'
          onClick={() => blogService.deleteOne(blog)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Blog
