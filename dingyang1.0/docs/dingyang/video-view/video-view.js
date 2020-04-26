import Vue from '../../core/vue/index.js';
import { convertDate } from '../date.js';
export default Vue.extend({
    template: /*html*/ `
    <div class="video-view">
      <section class="video-play" v-if="current">
        <div class="header">
          <h1>{{current.title}}</h1>
          <div class="time">{{current.date.toDateString()}}</div>
        </div>
        <video :src="'assets/videos/' + current.url" controls></video>
      </section>
      <section>
        <div class="header"><div class="dot">往期回顾</div></div>
        <div class="other-videos">
          <a v-for="v of otherVideos" class="other-video" :key="v.id" @click="changeVideo(v)">
            <div class="cover"><img :src="'assets/covers/' + v.coverUrl"></div>
            <h1>{{v.title}}</h1>
            <div class="time">{{v.date.toDateString()}}</div>
          </a>
        </div>
      </section>
    </div>
  `,
    props: ['idInit'],
    data() {
        return {
            id: this.idInit || 1,
            videos: [],
        };
    },
    async mounted() {
        // const mockup = await import('./video-view-mockup.js')
        // this.videos = await mockup.getVideoMockup()
        this.videos = (await (await fetch('http://localhost:5000/video/all')).json()).map(convertDate);
    },
    methods: {
        changeVideo(video) {
            this.$router.push('/videos/' + video.id);
            this.id = video.id;
        }
    },
    computed: {
        current() {
            if (this.id) {
                return this.videos.find((v) => v.id.toString() === this.id.toString());
            }
            return this.videos[0];
        },
        otherVideos() {
            if (this.id) {
                return this.videos.filter((v) => v.id.toString() !== this.id.toString());
            }
            return this.video.slice(1);
        }
    },
});
//# sourceMappingURL=video-view.js.map