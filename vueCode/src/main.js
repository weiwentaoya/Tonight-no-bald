import Vue from "vue";
import App from "./App.vue";
import router from "./router-v";
import store from "./store-v";

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue()


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
// console.log(app.$router);