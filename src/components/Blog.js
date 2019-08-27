import React, { useState } from 'react'
import blogsService from '../services/blogsService'
import styled from 'styled-components'

const Blog = ({ blog }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }
  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }

  const Button = styled.button`
    background: Aquamarine;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 3px solid DeepPink;
    border-radius: 3px;
  `

  return (
    <div className='blog-content'>
      <div>
        {blog.title} {blog.author}{' '}
        <div style={hideWhenVisible}>
          <Button onClick={() => setBlogInfoVisible(true)}>Show info</Button>
          <Button onClick={() => blogsService.likeOne(blog)}>Like</Button>
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
        <Button onClick={() => setBlogInfoVisible(false)}>Close info</Button>
        <Button onClick={() => blogsService.likeOne(blog)}>Like</Button>
        <Button
          className='delete-Button'
          onClick={() => blogsService.deleteOne(blog)}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default Blog
