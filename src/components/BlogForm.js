import React from 'react'

const BlogForm = ({
  addBlog,
  newBlogTitle,
  handleNewBlogTitleChange,
  newBlogAuthor,
  handleNewBlogAuthorChange,
  newBlogUrl,
  handleNewBlogUrlChange
}) => (
  <div>
    <br />
    <form onSubmit={addBlog}>
      Title:
      <input value={newBlogTitle} onChange={handleNewBlogTitleChange} /> <br />
      Author:
      <input value={newBlogAuthor} onChange={handleNewBlogAuthorChange} />
      <br />
      Url:
      <input value={newBlogUrl} onChange={handleNewBlogUrlChange} />
      <br />
      <button type='submit'>Save</button>
    </form>
  </div>
)

export default BlogForm
