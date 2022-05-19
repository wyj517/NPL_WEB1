import { login, logout, getInfo, getMyRoles } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, avatar) => {
    state.role = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
        // const { data } = res
        const token = `${res.token_type} ${res.access_token}`
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(res => {
        const  data  = res.data
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { username, full_name } = data
        commit('SET_NAME', username)
        commit('SET_AVATAR', full_name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user role
  getRole({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMyRoles(state.token).then(res => {
        const  data  = res.data[0].permission_list
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { permission_list } = data
        commit('SET_ROLE', permission_list)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

