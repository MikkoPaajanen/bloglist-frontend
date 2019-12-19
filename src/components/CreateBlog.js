import React from 'react'

// renders a form to add new blogs
const CreateBlog = (props) => {
  return (
    <form onSubmit={props.addBlog}>
      <h2>Create a new blog</h2>
      <div>
        Title: 
          <input
          type="text"
          value={props.newTitle}
          onChange={props.handleTitleChange}
          />
      </div>
      <div>
        Author: 
          <input
          type="text"
          value={props.newAuthor}
          onChange={props.handleAuthorChange}
          />
      </div>
      <div>
        Url: 
          <input
          type="url"
          value={props.newUrl}
          onChange={props.handleUrlChange}
          />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default CreateBlog