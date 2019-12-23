import React from 'react'

// renders a blog to the screen
const Blog = ({
  blog, handleBlogs,
  showAll,
  currentTitle,
  addLike,
  remove,
  removeBlog
}) => {
  const blogStyle = {
    padding: 5,
    margin: 5,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 10
  }

  // checking if name has been clicked to set showAll true and if blog title is the same
  // which is saved onClick to currentTitle
  if (showAll && blog.title === currentTitle && remove === blog.user.username) {
    return(
      <div className='titleAuthor' style={blogStyle}>
        <p onClick={() => handleBlogs(blog.title)}>{blog.title}, {blog.author}</p>
        <p>
          <a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} <button onClick={() => addLike(blog.id)}>Like</button><br/>
        added by {blog.user.name}<br/>
          <button onClick={() => removeBlog(blog.id)}>Remove blog</button>
        </p>
      </div>
    )
  } else if (showAll && blog.title === currentTitle) {
    return(
      <div className='titleAuthor' style={blogStyle}>
        <p onClick={() => handleBlogs(blog.title)}>{blog.title}, {blog.author}</p>
        <p>
          <a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} <button onClick={() => addLike(blog.id)}>Like</button><br/>
        added by {blog.user.name}</p>
      </div>
    )
  }
  return (
    <div className='titleAuthor' onClick={() => handleBlogs(blog.title)} style={blogStyle}>
      <p>{blog.title}, {blog.author} </p>
    </div>
  )
}

export default Blog