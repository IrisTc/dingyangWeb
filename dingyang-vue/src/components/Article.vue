<template>
  <div class="container">
    <div class="row">
      <div class="article col-md-7 col-xs-12" v-if="current">
        <div class="title">
          <h1>{{current.title}}</h1>
          <div class="date"><icon margin="right" name="clock-outline"></icon>{{current.date}}</div>
        </div>
        <article class="markdown">
          <vue-markdown :source="current.content"></vue-markdown>
        </article>
        <div class="back-to-top" @click="backToTop()"><icon margin="right" name="triangle"></icon>返回顶部</div>
      </div>
      <div class="other-articles col-md-5 col-xs-12" v-if="otherArticles">
        <div class="title">
          <div class="dot"></div>
          往期回顾
        </div>
        <div class="article-grid row">
          <a v-for="(a, index) of otherArticles.slice(0, 3)" :key="index" class="col-md-5 col-xs-5" :class="{'image-item': index === 0,   'card-item': index !== 0}" @click="changeArticle(a)">
            <img v-if="index === 0" class="background" :src="'static/covers/' + a.coverUrl">
            <div v-if="index !== 0" class="border"></div>
            <div class="content">
              <h1>{{a.title}}</h1>
              <p>{{a.description}}</p>
            </div>
          </a>
        </div>
        <a v-for="a of otherArticles.slice(3)" :key="a.id" class="normal-item" @click="changeArticle(a)">
          <div class="title">{{a.title}}</div>
          <div class="date">{{a.date}}</div>
          <icon margin="left" name="chevron-right"></icon>
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
@import '../style/article-view.scss'
</style>
<script>
import VueMarkdown from 'vue-markdown'
import Icon from './Icon'
export default {
  components: {
    Icon,
    VueMarkdown
  },
  props: ['type', 'articles', 'idInit'],
  data() {
    return {
      id: this.idInit
    }
  },
  computed: {
    current() {
      if (this.id) {
        return this.articles.find((a) => a.id.toString() === this.id.toString())
      }
      return this.articles[0]
    },
    otherArticles() {
      if (this.id) {
        return this.articles.filter((a) => a.id !== this.id)
      }
      return this.articles.slice(1)
    },
  },
  methods: {
    backToTop() {
      window.scrollTo(0, 0)
    },
    changeArticle(article) {
      this.$router.push('/articles/' + this.type + '/' + article.id)
      this.id = article.id
    }
  }
}
</script>