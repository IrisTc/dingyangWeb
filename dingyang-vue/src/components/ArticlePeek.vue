<template>
  <div class="article-peek">
    <div class="header">
      <div class="dot">{{title}}</div>
      <router-link class="more" :to="'/articles/' + type + '/1'">
        <div class="hover-effect"></div>
        <span>查看更多</span>
        <icon name="chevron-right" margin="left"></icon>
      </router-link>
    </div>
    <ol class="card-list">
      <router-link v-for="(article, index) of articles.slice(0,4)"  :key="article.id" class="card" :to="'/articles/' + type + '/' + article.id">
        <img v-if="index === 0" class="fill-background" :src="'static/covers/' + article.coverUrl">
        <img v-if="type && index !== 0" class="background" :src="'static/' + type + '.svg'">
        <div class="border"></div>
        <div class="content">
          <h1 class="title">{{article.title}}</h1>
          <span class="date">{{article.date}}</span>
          <p class="description">{{article.description}}</p>
        </div>
      </router-link>
    </ol>
  </div>
</template>
<style lang="sass" scoped>
@import "../style/article-peek.scss"
</style>
<script>
import Icon from "./Icon.vue"
export default {
    props: ['title', 'articles', 'type'],
    components:{
        Icon
    }
}
</script>