// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import promise from 'es6-promise'
import '../static/reset.css'
import '../static/lib/bootstrap/css/bootstrap.min.css'
import '../static/lib/bootstrap/js/bootstrap.min.js'

promise.polyfill()


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
