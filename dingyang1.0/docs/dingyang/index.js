import Vue from '../core/vue/index.js';
import VueRouter from '../core/vue-router/index.js';
const router = new VueRouter({
    // mode: 'history',
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/article-view/predictions/:id',
            component: () => import('./article-view/article-view.js').then(m => m.Predictions),
            props: true,
        },
        {
            path: '/article-view/predictions',
            redirect: '/article-view/predictions/1',
        },
        {
            path: '/article-view/stocks/:id',
            component: () => import('./article-view/article-view.js').then(m => m.Stocks),
            props: true,
        },
        {
            path: '/article-view/stocks',
            redirect: '/article-view/stocks/1',
        },
        {
            path: '/article-view/reports/:id',
            component: () => import('./article-view/article-view.js').then(m => m.Reports),
            props: true,
        },
        {
            path: '/article-view/reports',
            redirect: '/article-view/reports/1',
        },
        {
            path: '/article-view/investments/:id',
            component: () => import('./article-view/article-view.js').then(m => m.Investments),
            props: true,
        },
        {
            path: '/article-view/investments',
            redirect: '/article-view/investments/1',
        },
        {
            path: '/article-view/researches/:id',
            component: () => import('./article-view/article-view.js').then(m => m.Researches),
            props: true,
        },
        {
            path: '/article-view/researches',
            redirect: '/article-view/researches/1',
        },
        {
            path: '/intro',
            component: () => import('./intro/intro.js').then(m => m.default),
        },
        {
            path: '/duty',
            component: () => import('./duty/duty.js').then(m => m.default),
        },
        {
            path: '/book',
            component: () => import('./book/book.js').then(m => m.default),
        },
        {
            path: '/videos/:idInit',
            component: () => import('./video-view/video-view.js').then(m => m.default),
            props: true,
        },
        {
            path: '/videos',
            redirect: '/videos/1',
        },
        {
            path: '/home',
            component: () => import('./home/home.js').then(m => m.default),
        },
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '*',
            component: () => import('./not-found/not-found.js').then(m => m.default),
        }
    ]
});
new Vue({
    el: document.querySelector('dingyang-app'),
    components: {
        icon: () => import('./icon/icon.js'),
        dingyangFooter: () => import('./footer/footer.js'),
    },
    router,
    data: {
        navListOpen: false,
    },
    methods: {
        toggleNavList() {
            this.navListOpen = !this.navListOpen;
        },
        closeList(e) {
            if (e.target instanceof HTMLAnchorElement) {
                this.navListOpen = false;
            }
        }
    },
    template: `
    <div class="app">
      <header class="navbar">
        <router-link to="/home" class="logo">
          <img src="assets/logo.svg" height="64">
          <span class="logo-text">丁洋</span>
        </router-link>
        <nav>
          <div class="nav-list-menu" @click="toggleNavList()">
            <icon :name="navListOpen ? 'menu-open' : 'menu'"></icon>
          </div>
          <ul class="nav-list" :class="{open: navListOpen}" @click="closeList">
            <router-link to="/home">首页</router-link>
            <router-link to="/intro">丁洋简介</router-link>
            <router-link to="/videos">精彩视频</router-link>
            <router-link to="/article-view/predictions">今日预测</router-link>
            <router-link to="/article-view/stocks">股市人生</router-link>
            <router-link to="/article-view/reports">月度报告</router-link>
            <router-link to="/article-view/investments">投资哲学</router-link>
            <router-link to="/article-view/researches">实地调研</router-link>
            <router-link to="/book">实战手筋</router-link>
            <router-link to="/duty">信念使命</router-link>
          </ul>
        </nav>
      </header>
      <main>
        <transition>
          <router-view></router-view>
        </transition>
      </main>
      <dingyang-footer logo-path="assets/logo.svg"></dingyang-footer>
    </div>`,
});
//# sourceMappingURL=index.js.map