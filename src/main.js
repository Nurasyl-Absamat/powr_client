import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from "@/store/store";
import router from './router'
import VueAxios from 'vue-axios'
import axios from "axios";

Vue.config.productionTip = false
Vue.use(Vuex)
axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.headers = {
  'Content-Type': 'application/json'
};
axios.defaults
Vue.use(VueAxios, axios)



new Vue({
  store,
  axios,
  router,
  render: h => h(App)
}).$mount('#app')
