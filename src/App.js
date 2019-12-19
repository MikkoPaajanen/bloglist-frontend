import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'

// renders a notification if operation is succesful
const Notification = ({ message }) => {
  if (message === null) {
      return null
  }
  return (
      <div className="succesful">{message}</div>
  )
}

// renders an error notification if operation is not succesful
const ErrorNotification = ({ message }) => {
  if (message === null) {
      return null
  }
  return (
      <div className="error">{message}</div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [succesfulMessage, setSuccesfulMessage] = useState(null)

  // gets all blogs from database
  useEffect(() => {
    const getBlogs = async () => {
      const response = await blogService.getAll()
      setBlogs(response)
      console.log(response)
    }
    getBlogs()
  }, [])

  // stores userinformation to browser
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  // handles login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccesfulMessage('Succesfully logged in')
      setTimeout(() => {
        setSuccesfulMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // handles logout
  const logoutHandler = () => {
    setUser(null)
    window.localStorage.clear()
    setSuccesfulMessage('Succesfully logged out')
    setTimeout(() => {
      setSuccesfulMessage(null)
    }, 5000)
  }

  // handles adding a new blog
  const addBlog = async (event) => {
    event.preventDefault()
    console.log('do we get here')
    try {
      // a new blog formatted to an object for the backend
      const blogObject = {
        title: newTitle, author: newAuthor, url: newUrl
      }
      blogService.setToken(user.token)
      // creates a new blog
      await blogService.create(blogObject)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      // renders the newly added blog to the end of bloglist
      setBlogs(blogs.concat(blogObject))
      setSuccesfulMessage(`A new blog ${newTitle} added`)
      setTimeout(() => {
        setSuccesfulMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Title and url are required')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // creates login form 
  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <Notification message={succesfulMessage}/>
      <ErrorNotification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          Username 
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          Password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  // maps through blogs and sends each blog to Blog component to render onscreen
  const rows = () => blogs.map(blog => 
    <Blog
      key={blog.title}
      blog={blog}
    />)

  // handles changes in title box
  const handleTitleChange= (event) => {
    setNewTitle(event.target.value)
    console.log('newTitle', newTitle)
  }

  // handles changes in author box
  const handleAuthorChange= (event) => {
    setNewAuthor(event.target.value)
    console.log('newAuthor', newAuthor)
  }

  // handles changes in url box
  const handleUrlChange= (event) => {
    setNewUrl(event.target.value)
    console.log('newUrl', newUrl)
  }

  // if user is not logged in app shows only login form
  if (user === null) {
    return <div>{loginForm()}</div>
  }

  // when user is logged in app shows blogs and a form to add new blogs
  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button type="submit" onClick={() => logoutHandler()}>logout</button></p> 
      <br/>
      <Notification message={succesfulMessage}/>
      <ErrorNotification message={errorMessage} />
      <CreateBlog
      addBlog={addBlog}
      handleTitleChange={handleTitleChange}
      handleAuthorChange={handleAuthorChange}
      handleUrlChange={handleUrlChange}
      newTitle={newTitle}
      newAuthor={newAuthor}
      newUrl={newUrl}
      />
      <br/>
      {rows()}
    </div>
  )
}

export default App
