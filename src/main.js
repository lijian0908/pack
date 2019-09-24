// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui';
import axios from 'axios'
import vueAxios from 'vue-axios'

import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(Element)
Vue.use(vueAxios, axios)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
