import Vue from 'vue'
import App from './App.vue'
import VueSimpleAlert from "vue-simple-alert";

import vuetify from './plugins/vuetify'

import router from './plugins/router.js'
import store from './store'

Vue.use(VueSimpleAlert, { reverseButtons: true });

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
