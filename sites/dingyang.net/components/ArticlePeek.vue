<template>
  <div class="article-peek">
    <div class="header">
      <div class="dot">{{title}}</div>
      <router-link class="more" :to="'/article/' + type + '/1'">
        <div class="hover-effect"></div>
        <span>查看更多</span>
        <img src="../assets/icon/arrow-right.png" style="width:18px;height:18px">
      </router-link>
    </div>
    <ol class="card-list">
      <router-link v-for="(article, index) of articles"  :key="article.id" class="card" :to="'/article/' + type + '/' + article.id">
        <img v-if="index === 0" class="fill-background" :src="'https://dingyang-admin-1301593316.cos.ap-guangzhou.myqcloud.com/coverImg/' + article.coverUrl">
        <img v-if="type && index !== 0" class="background" :src="'/' + type + '.svg'">
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
@import "~assets/style/article-peek.scss"
</style>
<script>
export default {
    props: ['title', 'articles', 'type']
}
</script>