import Vue from './vue.dev.js'
import VueRouter from '../vue-router/index.js'
import { VueMarkdown } from '../vue-markdown/vue-markdown.js'
Vue.config.silent = true
Vue.config.devtools = true
Vue.use(VueRouter)
Vue.use(VueMarkdown)
export default Vue
