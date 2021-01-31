import Vue from "vue";
import Vuex from "./my-vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state){
      state.count++
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters:{
    doubleCount: store=>store.count*2
  },
  modules: {}
});
