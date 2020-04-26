import Vue from '../../core/vue/index.js'
import { ArticlePeek } from '../home/article-peek/article-peek.js'
import { convertDate } from '../date.js'
import { axios } from '../../core/axios/axios.js'

const ArticleView = Vue.extend({
  components: {
    Icon: () => import('../icon/icon.js'),
  },
  template: /*html*/`
    <div class="article-view">
      <div class="article" v-if="current">
        <div class="title">
          <h1>{{current.title}}</h1>
          <div class="date"><icon margin="right" name="clock-outline"></icon>{{current.date.toDateString()}}</div>
        </div>
        <article class="markdown"><vue-markdown>{{current.content}}</vue-markdown></article>
        <div class="back-to-top" @click="backToTop()"><icon margin="right" name="triangle"></icon>返回顶部</div>
      </div>
      <aside class="other-articles" v-if="otherArticles">
        <div class="title">
          <div class="dot"></div>
          往期回顾
        </div>
        <div class="article-grid">
          <a v-for="(a, index) of otherArticles.slice(0, 3)" :class="{'image-item': index === 0, 'card-item': index !== 0}" @click="changeArticle(a)">
            <img v-if="index === 0" class="background" :src="'assets/covers/' + a.coverUrl">
            <div v-if="index !== 0" class="border"></div>
            <div class="content">
              <h1>{{a.title}}</h1>
              <p>{{a.description}}</p>
            </div>
          </a>
        </div>
        <a v-for="a of otherArticles.slice(3)" :key="a.id" class="normal-item" @click="changeArticle(a)">
          <div class="title">{{a.title}}</div>
          <div class="date">{{a.date.toDateString()}}</div>
          <icon margin="left" name="chevron-right"></icon>
        </a>
      </aside>
    </div>
  `,
  props: ['type', 'articles', 'idInit'],
  data() {
    return {
      id: this.idInit
    }
  },
  computed: {
    current() {
      if (this.id) {
        return this.articles.find((a: ArticleDetail) => a.id.toString() === this.id.toString())
      }
      return this.articles[0]
    },
    otherArticles() {
      if (this.id) {
        return this.articles.filter((a: ArticleDetail) => a.id !== this.id)
      }
      return this.articles.slice(1)
    },
  },
  methods: {
    backToTop() {
      window.scrollTo(0, 0)
    },
    changeArticle(article: ArticleDetail) {
      this.$router.push('/article-view/' + this.type + '/' + article.id)
      this.id = article.id
    }
  },
})
export default ArticleView
const createSubComponent = (name: string) => {
  return Vue.extend({
    components: {
      ArticleView,
    },
    template: /*html*/`<article-view type="${name}" :articles="articles" :id-init="id"></article-view>`,
    props: ['id'],
    data() {
      return {
        articles: [] as ArticleDetail[]
      }
    },
    async mounted() {
      // const mockup = await import('./article-view-mockup.js')
      // this.articles = await mockup.getArticleMockup()

      this.articles = (await axios.get(`http://localhost:5000/article/${name}/all`)).data.map(convertDate)
    },
  })
}
export const Predictions = createSubComponent('predictions')
export const Stocks = createSubComponent('stocks')
export const Reports = createSubComponent('reports')
export const Investments = createSubComponent('investments')
export const Researches = createSubComponent('researches')
export interface ArticleDetail extends ArticlePeek {
  content: string
}