import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Intro from '@/views/Intro'
import Duty from '@/views/Duty'
import Video from '@/views/Video'
import Predictions from '@/views/Predictions'
import Stocks from '@/views/Stocks'
import Reports from '@/views/Reports'
import Investments from '@/views/Investments'
import Researches from '@/views/Researches'
import Book from '@/views/Book'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path:'/',
      redirect: '/home'
    },
    {
      path:'/home',
      component: Home
    },
    {
      path: '/intro',
      component: Intro
    },
    {
      path: '/video/:idInit',
      component: Video,
      props: true
    },
    {
      path: '/articles/predictions/:id',
      component: Predictions,
      props: true
    },
    {
      path: '/articles/stocks/:id',
      component: Stocks,
      props: true
    },
    {
      path: '/articles/reports/:id',
      component: Reports,
      props: true
    },
    {
      path: '/articles/investments/:id',
      component: Investments,
      props: true
    },
    {
      path: '/articles/researches/:id',
      component: Researches,
      props: true
    },
    {
      path: '/book',
      component: Book
    },
    {
      path: '/duty',
      component: Duty
    },
  ]
})
