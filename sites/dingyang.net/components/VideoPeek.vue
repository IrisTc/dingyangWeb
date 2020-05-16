<template>
    <div class="video-peek">
    <div class="header">
      <div class="dot">精彩视频</div>
      <router-link class="more" to="/video/1">
        <div class="hover-effect"></div>
        <span>查看更多</span>
        <img src="../assets/icon/arrow-right.png" style="width:18px;height:18px">
      </router-link>
    </div>
    <ol class="video-list">
      <router-link v-for="video of videos" :key="video.id" class="card" :to="'video/' + video.id">
        <img class="background" :src="'https://dingyang-admin-1301593316.cos.ap-guangzhou.myqcloud.com/coverImg/' + video.coverUrl">
        <div class="title-container">
          <h1 class="title">{{video.title}}</h1>
        </div>
      </router-link>
    </ol>
  </div>
</template>
<style lang="sass" scoped>
@import '~assets/style/video-peek.scss'
</style>
<script>
export default {
    props: ['videos']
}
</script>