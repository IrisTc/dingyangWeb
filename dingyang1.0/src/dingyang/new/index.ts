import Vue from '../../core/vue/index.js'
import VueRouter from '../../core/vue-router/index.js'

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/article',
      component: () => import('./article/article.js').then(m => m.default),
    },
    {
      path: '/video',
      component: () => import('./video/video.js').then(m => m.default),
    },
    {
      path: '/',
      redirect: '/article',
    },
  ]
})
new Vue({
  el: '.new-item-app',
  router,
  components: {
    dingyangFooter: () => import('../footer/footer.js'),
  },
  template: /*html*/`
    <div class="new-item-app">
      <header>
        <img class="logo" src="../assets/logo.svg">
        <h1>内容管理</h1>
        <nav>
          <router-link to="/article">文章</router-link>
          <router-link to="/video">视频</router-link>
        </nav>
      </header>
      <main>
        <transition>
          <router-view></router-view>
        </transition>
      </main>
      <dingyang-footer logo-path="../assets/logo.svg"></dingyang-footer>
    </div>
  `,
})