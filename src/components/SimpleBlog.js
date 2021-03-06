import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='titleAuthor'>
      {blog.title} {blog.author}
    </div>
    <div className='likes'>
      blog has {blog.likes} likes
      <button onClick={onClick} className='click'>like</button>
    </div>
  </div>
)

export default SimpleBlog