import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
// import 'amfe-flexible'
import './util/rem'
import Contextmenu from 'vue-contextmenujs'
Vue.use(Contextmenu)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  moment,
  render: (h) => h(App),
}).$mount('#app')
