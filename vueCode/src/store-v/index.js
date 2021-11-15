import Vue from "vue";
import Vuex from "./vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 28
  },
  mutations: {
    add:(state,n)=>{
      state.count+=n
    }
  },
  actions: {
    add:(ctx,n)=>{
      setTimeout(()=>{
        ctx.commit('add',n)
      },1000)
    }
  },
  getters: {
    doubleCount: state=>{
      return state.count*2
    },
    tripleCount: state=>{
      return state.count*3
    },
  }
});
