import Vue from '../../core/vue/index.js';
import { axios } from '../../core/axios/axios.js';
import { convertDate } from '../date.js';
export default Vue.extend({
    components: {
        'article-peek': () => import('./article-peek/article-peek.js'),
        'video-peek': () => import('./video-peek/video-peek.js'),
    },
    template: /*html*/ `
    <div class="home">
      <section class="predictions">
        <article-peek title="今日预测" type="predictions" :articles="predictions"></article-peek>
      </section>
      <section class="stocks">
        <article-peek title="股市人生" type="stocks" :articles="stocks"></article-peek>
      </section>
      <section class="researches">
        <article-peek title="实地调研" type="researches" :articles="researches"></article-peek>
      </section>
      <section class="investments">
        <article-peek title="投资哲学" type="investments" :articles="investments"></article-peek>
      </section>
      <section class="videos">
        <video-peek :videos="videos"></video-peek>
      </section>
    </div>
  `,
    data() {
        return {
            predictions: [],
            stocks: [],
            researches: [],
            investments: [],
            videos: [],
        };
    },
    methods: {
        async fetchArticlePeeks() {
            // const mockup = await import('./article-peek/article-peek-mockup.js')
            // this.predictions = mockup.getPredictionsMockup()
            // this.stocks = mockup.getStocksMockup()
            // this.researches = mockup.getResearchesMockup()
            // this.investments = mockup.getInvestmentsMockup()
            this.predictions = (await axios.get('http://localhost:5000/article/predictions/peeks')).data.map(convertDate);
            this.stocks = (await axios.get('http://localhost:5000/article/stocks/peeks')).data.map(convertDate);
            this.researches = (await axios.get('http://localhost:5000/article/researches/peeks')).data.map(convertDate);
            this.investments = (await axios.get('http://localhost:5000/article/investments/peeks')).data.map(convertDate);
        },
        async fetchVideoPeeks() {
            // const mockup = await import('./video-peek/video-peek-mockup.js')
            // this.videos = mockup.getVideoMockup()
            this.videos = (await axios.get('http://localhost:5000/video/peeks')).data;
        }
    },
    mounted() {
        this.fetchArticlePeeks();
        this.fetchVideoPeeks();
    },
});
//# sourceMappingURL=home.js.map