<template>
  <div class="content">
    <div class="row">
      <div class="article col-md-7 col-xs-12" v-if="current">
        <div class="title">
          <h1>{{current.title}}</h1>
          <div class="date"><img src="../assets/icon/clock.png" style="width:24px;height:24px">{{current.date}}</div>
        </div>
        <div class="markdown">
          <vue-markdown :source="current.content"></vue-markdown>
        </div>
        <div class="back-to-top" @click="backToTop()"><img src="../assets/icon/rising.png" style="width:20px;height:20px;margin-right:5px">返回顶部</div>
      </div>
      <div class="other-articles col-md-5 col-xs-12" v-if="otherArticles">
        <div class="title">
          <div class="dot"></div>
          往期回顾
        </div>
        <div class="article-grid row">
          <a v-for="(a, index) of otherArticles.slice(0, 3)" :key="index" class="col-md-5 col-xs-5" :class="{'image-item': index === 0,   'card-item': index !== 0}" @click="changeArticle(a)">
            <img v-if="index === 0" class="background" :src="'https://dingyang-admin-1301593316.cos.ap-guangzhou.myqcloud.com/coverImg/' + a.coverUrl">
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
          <img src="../assets/icon/arrow-right.png" style="width:18px;height:18px">
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="sass">
@import '~assets/style/markdown.scss'
@import '~assets/style/article-view.scss'
</style>
<script>
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown
  },
  props: ['type', 'articles', 'idInit'],
  data() {
    return {
      id: this.idInit,
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
      this.id = article.id
      this.$router.push('/article/' + this.type + '/' + article.id)     
    }
  }
}
</script>