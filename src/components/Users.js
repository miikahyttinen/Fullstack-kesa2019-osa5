import React from 'react'

const Users = props => {
  const { blogs, users } = props
  if (users.length === 0 || blogs.length === 0) {
    return <h1>Users</h1>
  }
  let userBlogs = []
  users.forEach(user => {
    userBlogs = userBlogs.concat({
      user: user.name,
      blogCount: blogs.filter(blog => blog.user.id === user.id).length
    })
  })

  return (
    <div>
      <h2>Users</h2>
      {userBlogs.map(userBlog => {
        return (
          <div>
            {' '}
            {userBlog.user} {userBlog.blogCount} blogs{' '}
          </div>
        )
      })}
    </div>
  )
}

export default Users
