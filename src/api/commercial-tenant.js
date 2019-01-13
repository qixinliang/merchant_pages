import axios from '@/libs/api.request'
export const getUserList = ({ token }) => {
  const data = {
    data: {
      token
    }
  }
  return axios.request({
    url: 'merchant/lists',
    data,
    method: 'get'
  })
}
