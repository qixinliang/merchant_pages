import {
  login,
  register,
  logout,
  getUserInfo
} from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator(state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    }
  },
  getters: {},
  actions: {
    // 登录
    handleLogin({ commit }, { userName, password }) {
      const username = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {

          console.log('resresresresresres')
          console.log(res)
          console.log(res.data)
          commit('setToken', 'super_admin')
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
    handleRegister({ commit }, { userName, password }) {
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
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
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
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            commit('setAvator', data.avator)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
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
