import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// DB
import db from './datastore'
import configs from './configs.js'


import contenteditable from 'vue-contenteditable'
Vue.use(contenteditable)

import VueMousetrap from 'vue-mousetrap'
Vue.use(VueMousetrap)

// Countable
import VueCountable from 'vue-countable'
Vue.component('vue-countable', VueCountable)


Vue.use(require('vue-moment'));

// import db from './ldb'
Vue.prototype.$db = db
Vue.prototype.$note = null
Vue.prototype.$configs = configs
Vue.use(ElementUI)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
