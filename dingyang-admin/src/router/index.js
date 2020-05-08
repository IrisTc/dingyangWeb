import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import article from '@/pages/article'
import video from '@/pages/video'
import hyarticle from '@/pages/hyarticle'
import hyothers from '@/pages/hyothers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: article,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/article',
      component: article,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/video',
      component: video,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/hyarticle',
      component: hyarticle,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/hyothers',
      component: hyothers,
      meta: {
        requireAuth: true,
      }
    }
  ]
})
