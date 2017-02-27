import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const state = {
  manageArticleList: [],
  manageNovelList: [],
  manageCommentList: [],
  manageReplyList: []
}
const mutations = {
  updateArticleList (state, data) {
    state.manageArticleList = data;
  }
}

const getters = {
  ['getManageArticleList'] (state) {
    return state.manageArticleList;
  }
}

const actions = {
  updateArticleList: ({ commit }, params) => {
      api.getArticleList(params)
          .then(resp => {
            if (resp.status === 200) {
               commit('updateArticleList', resp.data)
            }
          })
          .catch(err => {
            console.log(err);
          });
  },
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
