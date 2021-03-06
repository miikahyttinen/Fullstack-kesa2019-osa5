import axios from 'axios'
import { request } from 'https'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const getOne = async id => {
  const request = axios.get(`${baseUrl}/${id}`)
  const respone = await request
  return respone.data
}

const likeOne = async blog => {
  const blogNewLike = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  const request = axios.put(`${baseUrl}/${blog.id}`, blogNewLike)
  const response = await request
  return response.data
}

const deleteOne = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const result = window.confirm(
    `Are you sure you want to delete blog "${blog.name}"`
  )
  if (result === true) {
    const request = axios.delete(`${baseUrl}/${blog.id}`, config)
    const response = await request
    return response.data
  } else {
    return
  }
}

export default { getAll, setToken, create, likeOne, deleteOne, getOne }
