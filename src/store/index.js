import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetUps: [],
    user: {
      mail: '',
    }
  },
  mutations: {
    saveUserLogged (state, loggedUser) {
      localStorage.setItem('user', loggedUser.mail)
      state.user.mail = loggedUser.mail
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  },
})

