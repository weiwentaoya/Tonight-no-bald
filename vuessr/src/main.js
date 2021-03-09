import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import store from './store'

Vue.config.productionTip = false
export function createApp(context) {
  const router = createRouter()
  const app =  new Vue({
    router,
    context, //主要用于外面的renderer交互
    store,
    render: h => h(App)
  })
  return {app, router}
}

