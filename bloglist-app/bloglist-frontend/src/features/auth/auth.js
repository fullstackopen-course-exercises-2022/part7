import axios from 'axios'

const { REACT_APP_BLOG_URL } = process.env

const login = async (credentials) => {
  const response = await axios.post(`${REACT_APP_BLOG_URL}/api/users/auth`, credentials)
  window.localStorage.setItem('userInfo', JSON.stringify(response.data))
}

const logout = () => {
  localStorage.clear()
}

const getCurrentUser = () => {
  return JSON.parse(window.localStorage.getItem('userInfo'))
}

export const Auth = {
  login,
  logout,
  getCurrentUser
}