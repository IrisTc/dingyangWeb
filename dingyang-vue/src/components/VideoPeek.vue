<template>
    <div class="video-peek">
    <div class="header">
      <div class="dot">精彩视频</div>
      <router-link class="more" to="/video/1">
        <div class="hover-effect"></div>
        <span>查看更多</span>
        <icon name="chevron-right" margin="left"></icon>
      </router-link>
    </div>
    <ol class="video-list">
      <router-link v-for="video of videos" :key="video.id" class="card" :to="'video/' + video.id">
        <img class="background" :src="'static/covers/' + video.coverUrl">
        <div class="title-container">
          <h1 class="title">{{video.title}}</h1>
        </div>
      </router-link>
    </ol>
  </div>
</template>
<style lang="sass" scoped>
@import './../style/video-peek.scss'
</style>
<script>
import Icon from "./Icon.vue"
export default {
    props: ['videos'],
    components: {
        Icon
    },
}
</script>