import axios from '@/libs/api.request'

export const login = ({ username, password }) => {
  const data = {
    data: {
      username,
      password
    }
  }
  return axios.request({
    url: 'merchant/login',
    data,
    method: 'post'
  })
}

export const register = ({ username, password }) => {
  const data = {
    data: {
      username,
      password
    }
  }
  return axios.request({
    url: 'merchant/register',
    data,
    method: 'post'
  })
}

export const getUserInfo = (username) => {
  return axios.request({
    url: 'merchant/info',
    data: {
      data: {
        username
      }
    },
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'merchant/logout',
    method: 'post'
  })
}
