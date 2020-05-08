<template>
    <div class="row home">
      <section class="col-md-6 col-xs-12">
        <article-peek title="今日预测" type="predictions" :articles="Predictions"></article-peek>
      </section>
      <section class="col-md-6 col-xs-12">
        <article-peek title="股市人生" type="stocks" :articles="Stocks"></article-peek>
      </section>
      <section class="col-md-6 col-xs-12">
        <article-peek title="实地调研" type="researches" :articles="Researches"></article-peek>
      </section>
      <section class="col-md-6 col-xs-12">
        <article-peek title="投资哲学" type="investments" :articles="Investments"></article-peek>
      </section>
      <section class="col-md-12 col-xs-12">
        <video-peek :videos="videos"></video-peek>
      </section>
    </div>
</template>
<style lang="sass" scoped>
@import '../style/home.scss'
</style>
</style>
<script>
import ArticlePeek from "./../components/ArticlePeek"
import VideoPeek from "./../components/VideoPeek"
import axios from 'axios'
export default {
    components: {
        ArticlePeek,
        VideoPeek
    },
    data(){
      return{
        Predictions: [],
        Stocks: [],
        Researches: [],
        Investments: [],
        videos: []
      }
    },
    mounted: function() {
        this.getArticles();
        this.getVideos();
    },
    methods: {
        getArticles(){
          axios.get("https://service-neh664ng-1301593316.gz.apigw.tencentcs.com/release/article").then((result)=>{
            console.log(result);
            var articles = result.data[0];
            this.Predictions = articles.Predictions;
            this.Stocks = articles.Stocks;
            this.Researches = articles.Researches;
            this.Investments = articles.Investments;
          })
        },
        getVideos(){
          axios.get("https://service-24wq5j1c-1301593316.gz.apigw.tencentcs.com/release/video").then((result)=>{
            console.log(result);
            this.videos = result.data;
          })
        }
    }
}
</script>