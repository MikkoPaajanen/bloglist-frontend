import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// sets users token so that it can be used in the post method
const setToken = newToken => {
  token = `bearer ${newToken}`
}
// get all blogs from database
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// adds new blog to database with post method
const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// updates likes to database when clicked like button
const update = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

export default { getAll, create, setToken, update }