import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'

// 初始化一个state，用户存储数据
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // 按钮权限
    buttons: [],
    // 角色
    roles: [],
    // 服务器返回的权限相关信息，数组里面是字符串
    routes: [],
    // 对比之后【项目中已有的异步路由，和服务器返回的权限信息进行比对，最终需要展示的异步路由】
    resultAsyncRoutes: [],
    resultAllRoutes: []// 拼上公共路由+异步路由，就是最终能展示给该用户的所有路由
  }
}

const state = getDefaultState()

// 唯一修改state的地方
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name
    state.avatar = userInfo.avatar
    state.buttons = userInfo.buttons// 按钮权限
    state.roles = userInfo.roles// 角色名
    state.routes = userInfo.routes// 菜单或功能权限
  },
  // 最终计算出来的异步路由
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    state.resultAsyncRoutes = asyncRoutes
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes)
    // 给路由器添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }

}

// 定义一个函数:两个函数进行对比，asyncRoutes和data.routes，得出当前用户能显示哪些异步路由
const calAsyncRoutes = (asyncRoutes, routes) => {
  return asyncRoutes.filter(item => {
    if (routes.indexOf(item.name) != -1) {
      // 这里注意！！！！一定不能直接用item.children>0去判断是否还有子元素，因为有可能会没有children这个属性，导致报错
      if (item.children && item.children.length) {
        item.children = calAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

// 发异步请求
const actions = {
  // 用户登录
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    // 处理登录信息，把username中可能有的空格去掉
    const result = await login({ username: username.trim(), password: password })
    if (result.code === 20000) {
      // 储存token
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)// cookies设置
    } else {
      return Promise.reject(new Error('error'))
    }
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // vuex存储用户的全部信息
        commit('SET_USERINFO', data)
        commit('SET_RESULTASYNCROUTES', calAsyncRoutes(asyncRoutes, data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // 清除cookies中的token，必须第一个清除
        resetRouter() // 路由重置
        commit('RESET_STATE')// 清除store储存的内容
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

