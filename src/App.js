import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Notifications from './components/Notifications'


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

  
  // maps through blogs and sends each blog to Blog component to render onscreen
  const rows = () => blogs.map(blog => 
    <Blog
      key={blog.title}
      blog={blog}
    />)

  // handles changes in title box
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
    console.log('newTitle', newTitle)
  }

  // handles changes in author box
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
    console.log('newAuthor', newAuthor)
  }

  // handles changes in url box
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
    console.log('newUrl', newUrl)
  }

  // handles changes in username box on login
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  // handles changes in password box on login
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  // if user is not logged in app shows only login form
  if (user === null) {
    return (
      <LoginForm 
        succesfulMessage={succesfulMessage}
        errorMessage={errorMessage}
        handleLogin={handleLogin}
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
      />
    )
  }

  // when user is logged in app shows blogs and a form to add new blogs
  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button type="submit" onClick={() => logoutHandler()}>logout</button></p> 
      <br/>
      <Notifications.Notification message={succesfulMessage}/>
      <Notifications.ErrorNotification message={errorMessage} />
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
