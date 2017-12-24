import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../app.service.js'
import postsModule from './posts'

Vue.use(Vuex)

const state = {
  isAuthenticated: false
}

const store = new Vuex.Store({
  modules: {
    postsModule
  },
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    }
  },
  actions: {
    logout (context) {
      context.commit('logout')
    },
    login (credentials, context) {
      return new Promise((resolve) => {
        appService.login(credentials)
          .then((data) => {
            context.commit('login', data) // mutation receiving token returned
            // window.localStorage.setItem('vue-spa-token', data.token)
            // window.localStorage.setItem('vue-spa-tokenExpiration', data.expiration)
            // this.isAuthenticated = true
            resolve()
          })
          .catch((err) => {
            window.alert('Could not log in!')
            console.log('Login FAIL: ' + err)
          })
      })
    }
  },
  mutations: {
    logout (state) {
      if (typeof window === 'undefined') {
        window.localStorage.setItem('vue-spa-token', null)
        window.localStorage.setItem('vue-spa-tokenExpiration', null)
      }
      state.isAuthenticated = false
    },
    login (state, token) {
      if (typeof window === 'undefined') {
        window.localStorage.setItem('vue-spa-token', token.token)
        window.localStorage.setItem('vue-spa-tokenExpiration',
          token.expiration)
      }
      state.isAuthenticated = true
    }
  }
})

if (typeof window === 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    let expiration = window.localStorage.getItem('vue-spa-tokenExpiration')
    var unixTimestamp = new Date().getTime() / 1000
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
      console.log('setting Auth = true')
      store.state.isAuthenticated = true
    }
  })
}
export default store
