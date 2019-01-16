import {
  login,
  register,
  logout,
  getUserInfo
} from '@/api/user'
import { setToken, getToken, getUserName, setUserName, setAccessToken, getAccessToken } from '@/libs/util'

export default {
  state: {
    userName: getUserName(),
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    accessToken: getAccessToken(),
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
      setUserName(name)
    },
    setAccess (state, access) {
      switch (access) {
        case 1:
          state.access = ['customer']
          break
        case 2:
          state.access = ['agent']
          break
        case 3:
          state.access = ['customer', 'agent', 'admin']
          break
      }
    },
    setToken (state, type) {
      switch (type) {
        case 0:
          state.token = ''
          break
        case 1:
          state.token = 'customer'
          break
        case 2:
          state.token = 'agent'
          break
        case 3:
          state.token = 'admin'
          break
      }
      setToken(state.token)
    },
    setAccessToken (state, token) {
      state.accessToken = token
      setAccessToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  getters: {},
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      const username = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {

          console.log('resresresresresres')
          console.log(res)
          console.log(res.data)
          // res.data = {
          //   'error_code': 0,
          //   'error_msg': '登陆成功',
          //   'data': { 'uid': 8, 'user_type': 1, 'token': '4d1134eb4c88fcee5293d8de2112781c' }
          // }
          commit('setToken', res.data.data.user_type)
          commit('setUserName', username)
          // commit('setToken', 'super_admin')
          commit('setAccessToken', res.data.data.token)
          if (res.data.error_msg === 0) {
            commit('setToken', 'admin')
          }
          if (res.data.error_msg === '请勿重复登陆') {

            // commit('setToken', 'customer')
            // console.log('已登录')
          }
          // const data = res.data
          // commit('setToken', data.token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 注册
    handleRegister ({ commit }, { userName, password }) {
      const username = userName.trim()
      return new Promise((resolve, reject) => {
        register({
          username,
          password
        }).then(res => {
          console.log('register')
          console.log(res)
          // this.$router.push({
          //   name: this.$config.homeName
          // })
          // const data = res.data
          // commit('setToken', 'data.token')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', 0)
          commit('setAccess', [])
          commit('setAccessToken', '')
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          // state.userName = 'abc'
          getUserInfo(state.userName).then(res => {
            const data = res.data
            console.log(data)
            commit('setAvator', data.data.logo)
            // commit('setUserName', data.name)
            commit('setUserId', data.data.id)
            commit('setAccess', data.data.type)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
