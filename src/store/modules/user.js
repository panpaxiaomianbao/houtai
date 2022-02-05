import { login, logout, getInfo } from '@/api/user'
import { resetRouter } from '@/router'



const state = {
  token: localStorage.getItem("token"),
  name: '',
  avatar: ''
}
const mutations = {
  RESET_STATE(state){
    state.token=""
    state.name=""
    state.avatar=""
  },
  
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 登录
  async login({ commit }, userInfo){
    const { username, password } = userInfo
    const rel=await login({ username: username.trim(), password: password })
    if(rel.code===20000){
      const { data } = rel
      commit('SET_TOKEN', data.token)
       // 在本地储存中保存token
      localStorage.setItem("token",data.token)
      return "成功啦~~~"
    }else{
      Promise.reject(new Error("登录失败啦~~~"))
    }
  },
  // 获取用户信息
  async getInfo({ commit, state }){
    const rel=await getInfo(state.token)
    if(rel.code===20000){
      const { data } = rel
      if (!data) {
        return Promise.reject(new Error("验证失败请重新登录~~~"))
      }
      const { name, avatar } = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      return data
    }else{
      return Promise.reject(new Error(rel.message))
    }
  },

  // 退出登录
  async logout({ commit, state }){
    const rel=await logout(state.token)
    if(rel.code===20000){
       // 删除本地储存中的token
       localStorage.removeItem("token")
       resetRouter()
       commit('RESET_STATE')
       return "ok~~~"
    }else{
      return Promise.reject(new Error(rel.message))
    }
  },
   // 删掉用户信息
  async resetToken({ commit }){
    localStorage.removeItem("token")
    commit('RESET_STATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

