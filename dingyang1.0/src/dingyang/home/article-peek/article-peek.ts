import Vue from '../../../core/vue/index.js'

export interface ArticlePeek {
  title: string
  date: Date
  description: string
  id: number
  coverUrl?: string
}
export default Vue.extend({
  props: ['title', 'articles', 'type'],
  components: {
    icon: () => import('../../icon/icon.js'),
  },
  template: /*html*/`
  <div class="article-peek">
    <div class="header">
      <div class="dot">{{title}}</div>
      <router-link class="more" :to="'/article-view/' + type">
        <div class="hover-effect"></div>
        <span>查看更多</span>
        <icon name="chevron-right" margin="left"></icon>
      </router-link>
    </div>
    <ol class="card-list">
      <router-link v-for="(article, index) of articles" :key="article.id" class="card" :to="'/article-view/' + type + '/' + article.id">
        <img v-if="index === 0" class="fill-background" :src="'assets/covers/' + article.coverUrl">
        <img v-if="type && index !== 0" class="background" :src="'assets/' + type + '.svg'">
        <div class="border"></div>

        <div class="content">
          <h1 class="title">{{article.title}}</h1>
          <span class="date">{{article.date.toDateString()}}</span>
          <p class="description">{{article.description}}</p>
        </div>
      </router-link>
    </ol>
  </div>
  `,
})