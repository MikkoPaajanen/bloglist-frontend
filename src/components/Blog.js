import React from 'react'

// renders a blog to the screen
const Blog = ({ blog }) => (
  <div>
    <p>{blog.title} {blog.author}</p>
  </div>
)

export default Blog