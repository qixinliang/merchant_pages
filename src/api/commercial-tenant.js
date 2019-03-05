import axios from '@/libs/api.request'

export const getUserList = ({ url, username, pagination }) => {
  const data = {
    data: {
      username,
      pagination
    }
  }
  return axios.request({
    url: url,
    data,
    method: 'post'
  })
}

export const editUser = ({ username, password, repass, logo, uid, access_token }) => {
  const data = {
    data: {
      username,
      password,
      repass,
      logo
    },
    uid,
    access_token
  }
  return axios.request({
    url: '/merchant/edit',
    data,
    method: 'post'
  })
}

export const editUserDetail = ({ id, merchant_name, boss, tel, mobile, address, logo, licence, uid, access_token }) => {
  const data = {
    data: {
      id,
      merchant_name,
      boss,
      tel,
      mobile,
      address,
      logo,
      licence
    },
    uid,
    access_token
  }
  return axios.request({
    url: '/merchant/complete',
    data,
    method: 'post'
  })
}

export const addUser = ({ username, password, repass, logo, uid, access_token }) => {
  const data = {
    data: {
      username,
      password,
      repass,
      logo
    },
    uid,
    access_token
  }
  return axios.request({
    url: '/merchant/add',
    data,
    method: 'post'
  })
}

// export const setQrcode = ({ merchant_id, uid, access_token }) => {
//   const data = {
//     data: {
//       merchant_id
//     },
//     uid,
//     access_token
//   }
//   return axios.request({
//     url: '/merchant/erweima',
//     data,
//     method: 'post'
//   })
// }

export const setQrcode = ({ merchant_id, uid, access_token }) => {
  const data = {
    data: {
      merchant_id
    },
    uid,
    access_token
  }
  return axios.request({
    url: '/weixin/qr',
    data,
    method: 'post'
  })
}


export const delUser = ({ merchant_id, uid, access_token }) => {
  const data = {
    data: {
      merchant_id,
    },
    uid,
    access_token
  }
  return axios.request({
    url: '/merchant/del',
    data,
    method: 'post'
  })
}


