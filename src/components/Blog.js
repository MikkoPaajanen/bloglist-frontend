import React from 'react'

// renders a blog to the screen
const Blog = ({ blog, handleBlogs, showAll, currentTitle, addLike }) => {
  const blogStyle = {
    padding: 5,
    margin: 5,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 10
  }

  // checking if name has been clicked to set showAll true and if blog title is the same 
  // which is saved onClick to currentTitle
  if (showAll && blog.title === currentTitle ){
    return(
      <div style={blogStyle}>
        <p onClick={() => handleBlogs(blog.title)}>{blog.title}, {blog.author}</p>
        <p>
        <a href={blog.url}>{blog.url}</a><br/>
        {blog.likes} <button onClick={() => addLike(blog.id)}>like</button><br/>
        added by {blog.user.name}</p>
      </div>
    )
  }
  return (
  <div onClick={() => handleBlogs(blog.title)} style={blogStyle}>
    <p>{blog.title}, {blog.author} </p>
  </div>
  )
}

export default Blog