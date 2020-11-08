import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'popper.js/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import VueToast from 'vue-toast-notification'

Vue.config.productionTip = false
Vue.use(VueToast)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
