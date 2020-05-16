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
//全局拦截
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     console.log(getCookie('UserName'))
//     if (getCookie('UserName') != null) {
//       next()
//     } else {
//       console.log('to login')
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     next()
//   }
// })


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

function getCookie(name) { //获取指定名称的cookie值
  // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) {
    console.log(arr);
    return unescape(arr[2]);
  }
  return null;
}