import axios from '@/libs/api.request'

export const getSkuList = ({ url, sku_name, pagination }) => {
  const data = {
    data: {
      sku_name,
      pagination
    }
  }
  return axios.request({
    url: url,
    data,
    method: 'post'
  })
}

export const editSku = ({ sku_id, sku_name, valid_time, redirect_url, uid, access_token, logo }) => {
  const data = {
    data: {
      sku_id,
      sku_name,
      valid_time,
      redirect_url,
      logo
    },
    uid,
    access_token
  }
  return axios.request({
    url: '/sku/edit',
    data,
    method: 'post'
  })
}

export const addSku = ({ sku_name, valid_time, logo, redirect_url, uid, access_token }) => {
  const data = {
    data: {
      sku_name,
      valid_time,
      logo,
      redirect_url
    },
    uid,
    access_token
  }
  return axios.request({
    url: '/sku/add',
    data,
    method: 'post'
  })
}

export const delSku = ({ sku_id, uid, access_token }) => {
  const data = {
    data: {
      sku_id
    },
    uid,
    access_token
  }
  return axios.request({
    url: '/sku/del',
    data,
    method: 'post'
  })
}

export const handleAudit = ({ sku_id, status, uid, access_token }) => {
  const data = {
    data: {
      sku_id,
      status,
    },
    uid,
    access_token
  }
  return axios.request({
    url: '/sku/audit',
    data,
    method: 'post'
  })
}


