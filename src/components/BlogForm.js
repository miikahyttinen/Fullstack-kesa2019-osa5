import React from 'react'
import styled from 'styled-components'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Form = styled.form`
  margin: 0 auto;
`

const BlogForm = ({
  addBlog,
  newBlogTitle,
  handleNewBlogTitleChange,
  newBlogAuthor,
  handleNewBlogAuthorChange,
  newBlogUrl,
  handleNewBlogUrlChange
}) => (
  <Page>
    <br />
    <Form onSubmit={addBlog}>
      Title:
      <input value={newBlogTitle} onChange={handleNewBlogTitleChange} /> <br />
      Author:
      <input value={newBlogAuthor} onChange={handleNewBlogAuthorChange} />
      <br />
      Url:
      <input value={newBlogUrl} onChange={handleNewBlogUrlChange} />
      <br />
      <button type='submit'>Save</button>
    </Form>
  </Page>
)

export default BlogForm
