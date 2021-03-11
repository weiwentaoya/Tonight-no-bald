import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

Vue.config.productionTip = false
Vue.mixin({
  beforeMount(){
    const { asyncData } = this.$options;
    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store, 
        route: this.$route,
      })
    }
  }
})
export function createApp(context) {
  const router = createRouter()
  const store = createStore()
  const app =  new Vue({
    router,
    context, //主要用于外面的renderer交互
    store,
    render: h => h(App)
  })
  return {app, router, store}
}
