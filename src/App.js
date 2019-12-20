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
  const [newBlogVisible, setNewBlogVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [currentTitle, setCurrentTitle] = useState('')

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
  
  // adds right information to http request put when adding a like
  const addLike = async (id) => {
    console.log('clicked button')
    try {
      console.log('id', id, typeof id)
      const rightObject = blogs.find(blog => blog.id === id)
      // console.log('blogObject', rightObject)
      const blogObject = {
        user: rightObject.user.id,
        likes: rightObject.likes + 1,
        author: rightObject.author,
        title: rightObject.title,
        url: rightObject.url,
        id: rightObject.id
      }
      console.log('blogObject', blogObject)
      blogService.setToken(user.token)
      const returnedBlog = await blogService.update(blogObject)
      setBlogs(blogs.map(blog => blog.title !== blogObject.title ? blog : returnedBlog))
    } catch (exception) {
      setErrorMessage('Something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    try {
      console.log('clicked remove', id)
      const findBlog = blogs.find(blog => blog.id === id)
      console.log('blog to remove', findBlog)
      window.confirm(`Remove blog ${findBlog.title}`)
      blogService.setToken(user.token)
      const deletedBlog = await blogService.remove(findBlog)
      console.log('deleted Blog', deletedBlog)
      setBlogs(blogs.filter(blog => blog.id !== findBlog.id))
      setSuccesfulMessage(`Succesfully removed ${deletedBlog.title}`)
      setTimeout(() => {
        setSuccesfulMessage(null)
      })
    } catch (exception) {
      setErrorMessage('Unable to delete blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }
  // hides and shows blog form with the click of a button
  const blogForm = () => {
    const hideWhenVisible = { display: newBlogVisible ? 'none' : ''}
    const showWhenVisible = { display: newBlogVisible ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogVisible(true)}>Add a new blog</button>
        </div>
        <div style={showWhenVisible}>
          <CreateBlog
          addBlog={addBlog}
          handleTitleChange={({ target }) => setNewTitle(target.value)}
          handleAuthorChange={({ target }) => setNewAuthor(target.value)}
          handleUrlChange={({ target }) => setNewUrl(target.value)}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          />
          <button onClick={() => setNewBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  // maps through blogs and sends each blog to Blog component to render onscreen
  const rows = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    const some = () => blogs.map(blog => 
      <Blog
        key={blog.title}
        blog={blog}
        handleBlogs={handleBlogs}
        showAll={showAll}
        currentTitle={currentTitle}
        addLike={addLike}
        removeBlog={removeBlog}
      />)
    return some()
  }

  // handles clicks on blogs name, sets blog title to currentTitle
  // so that it can be compared to show all info only on clicked blog
  const handleBlogs = (title) => {
    console.log('Clicked name')
    console.log('cliced blog', title)
    setCurrentTitle(title)
    if (showAll === false) {
      setShowAll(true)
    } else if (title === currentTitle) {
      setShowAll(false)
    }
  }
  // if user is not logged in app shows only login form
  if (user === null) {
    return (
      <LoginForm 
        succesfulMessage={succesfulMessage}
        errorMessage={errorMessage}
        handleLogin={handleLogin}
        username={username}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        password={password}
        handlePasswordChange={({ target }) => setPassword(target.value)}
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
      {blogForm()}
      <br/>
      {rows()}
    </div>
  )
}

export default App
