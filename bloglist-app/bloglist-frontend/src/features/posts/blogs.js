import axios from 'axios'
import { Auth } from '../auth/auth'

const { REACT_APP_BLOG_URL } = process.env

const user = Auth.getCurrentUser()

const config = {
  headers: { Authorization: `Bearer ${user?.token}`}
}

const create = async (credentials) => {
  const response = await axios.post(`${REACT_APP_BLOG_URL}/api/blogs`, credentials, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(`${REACT_APP_BLOG_URL}/api/blogs`)
  return request.then(response => response.data)
}

const getById = (id) => {
  const request = axios.get(`${REACT_APP_BLOG_URL}/api/blogs/${id}`)
  return request.then(response => response.data)
}

const updateById = async (id, formData) => {
  console.log(formData)
  const request = await axios.put(`${REACT_APP_BLOG_URL}/api/blogs/${id}`, formData, config)
  return request.data
}

const addComments = async (id, data) => {
  const response = await axios.put(`${REACT_APP_BLOG_URL}/api/blogs/comments/${id}`, data, config)
  console.log(data)
  return response.data
}

const deleteById = async (id) => {
  const request = await axios.delete(`${REACT_APP_BLOG_URL}/api/blogs/${id}`, config)
  return request.data
}

export const Blogs = {
  create,
  getAll,
  getById,
  updateById,
  addComments,
  deleteById
}