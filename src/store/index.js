import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentComponent: 'Layout'
}
const mutations = {
  updateDocComponents (state, component) {
    state.currentComponent = component;
  }
}

const getters = {
  ['getCurrentComponent'] (state) {
    return state.currentComponent;
  }
}

const actions = {
  updateDocComponents: ({ commit }, component) => commit('updateDocComponents', component),
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
