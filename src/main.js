import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from "./store"
import VueMask from 'v-mask'

Vue.config.productionTip = false

Vue.use(VueMask);

export const API_URL = 'http://localhost:8080';
export const CLIENT_URL = 'http://localhost:8081';


export const API_CEP = 'https://viacep.com.br/ws/';

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
