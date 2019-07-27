import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let store = new Vuex.Store({

  state: {
    login: false,
    title: '',
    hideHeader: false, // 隐藏H5头
    isHeader: true,
    showLeftMenu: false, // 是否显示首页左侧菜单
    authInfo: {},
    userInfo: {},
    details: {},
    attestation: false,
    needLogin: true, // 是否需要登录
    hideStatusHeader: false, // 隐藏H5状态栏
    webviewIndex: null, // webview里面的层级,== H5历史记录长度
    isYysAuth: !!sessionStorage.getItem('isYysAuth') // 是否是运营商认证
  },
  mutations: {
    'SET-LOGIN' (state, login) {
      state.login = login;
    },
    'SET-TITLE' (state, title) {
      state.title = title;
    },
    'SET-AUTH' (state, data) {
      state.authInfo = data;
    },
    'SET-NEEDLOGIN' (state, data) {
      state.needLogin = data;
    },
    'HIDE-STATUSHEADE'(state, data) {
      state.hideStatusHeader = data;
    },
    'SET-YYS-AUTH'(state, data) {
      sessionStorage.setItem('isYysAuth', data)
      state.isYysAuth = data
    }
  },
  actions: {
    setLogin ({commit}, login) {
      commit('SET-LOGIN', login)
    },
    setTitle ({commit}, title) {
      commit('SET-TITLE', title)
    },
    setAuth ({commit}, data) {
      commit('SET-AUTH', data)
    },
    setNeedLogin ({commit}, data) {
      commit('SET-NEEDLOGIN', data)
    },
    hideStatusHeader({commit}, data){
      commit('HIDE-STATUSHEADE', data)
    }
  },
  getters: {

  }
})

export default store
