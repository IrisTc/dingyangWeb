import Vue from '../../../core/vue/index.js';
export default Vue.extend({
    props: ['videos'],
    components: {
        icon: () => import('../../icon/icon.js'),
    },
    template: /*html*/ `
  <div class="video-peek">
    <div class="header">
      <div class="dot">精彩视频</div>
      <router-link class="more" to="/videos">
        <div class="hover-effect"></div>
        <span>查看更多</span>
        <icon name="chevron-right" margin="left"></icon>
      </router-link>
    </div>
    <ol class="video-list">
      <router-link v-for="video of videos" :key="video.id" class="card" :to="'/videos/' + video.id">
        <img class="background" :src="'assets/covers/' + video.coverUrl">
        <div class="title-container">
          <h1 class="title">{{video.title}}</h1>
        </div>
      </router-link>
    </ol>
  </div>
  `
});
//# sourceMappingURL=video-peek.js.map