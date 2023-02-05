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
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$moment = moment

const service = axios.create({
  baseURL: process.env.VUE_APP_PICA_API,
  timeout: 6000,
  headers: {
    'api-key': 'C69BAF41DA5ABD1FFEDC6D2FEA56B',
    accept: 'application/vnd.picacomic.com.v1+json',
    'app-channel': '2',
    nonce: '037ed977eaf34de5a067929ec52b0644',
    'app-version': '2.2.1.2.3.4',
    'app-uuid': 'defaultUuid',
    'app-platform': 'android',
    'app-build-version': '45',
    'Content-Type': 'application/json; charset=UTF-8',
    'User-Agent': 'okhttp/3.8.1',
    'image-quality': 'original',
  },
})

service.interceptors.request.use((config) => {
  const token = localStorage.getItem('pica_token')
  if (token) {
    config.headers['Authorization'] = token
  }

  return config
})

new Vue({
  router,
  store,
  moment,
  service,
  render: (h) => h(App),
}).$mount('#app')
