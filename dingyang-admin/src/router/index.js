import Vue from 'vue'
import Router from 'vue-router'
import article from '@/pages/article'
import video from '@/pages/video'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/article',
      component: article
    },
    {
      path: '/article',
      component: article
    },
    {
      path: '/video',
      component: video
    }
  ]
})
