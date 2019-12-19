import axios from 'axios'
const baseUrl = '/api/login'

// sends login information to backend
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }