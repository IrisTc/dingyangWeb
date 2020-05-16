<template>
    <div class="row home">
      <section class="col-md-6 col-xs-12 bottom">
        <article-peek title="今日预测" type="prediction" :articles="Predictions"></article-peek>
      </section>
      <section class="col-md-6 col-xs-12 bottom">
        <article-peek title="股市人生" type="stock" :articles="Stocks"></article-peek>
      </section>
      <section class="col-md-6 col-xs-12 bottom">
        <article-peek title="实地调研" type="research" :articles="Researches"></article-peek>
      </section>
      <section class="col-md-6 col-xs-12 bottom">
        <article-peek title="投资哲学" type="investment" :articles="Investments"></article-peek>
      </section>
      <section class="col-md-12 col-xs-12 bottom">
        <video-peek :videos="videos"></video-peek>
      </section>
    </div>
</template>
<style scoped>
.bottom {
  margin-bottom: 40px;
}
</style>
<script>
import ArticlePeek from "~/components/ArticlePeek"
import VideoPeek from "~/components/VideoPeek"
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
    async asyncData () {
      const predictions = await axios.get("http://service-jex1lh0j-1301593316.sh.apigw.tencentcs.com/release/article?type=prediction&count=4");
      const stocks = await axios.get("http://service-jex1lh0j-1301593316.sh.apigw.tencentcs.com/release/article?type=stock&count=4");
      const researches = await axios.get("http://service-jex1lh0j-1301593316.sh.apigw.tencentcs.com/release/article?type=research&count=4");
      const investments = await axios.get("http://service-jex1lh0j-1301593316.sh.apigw.tencentcs.com/release/article?type=investment&count=4");
      const video = await axios.get("http://service-jex1lh0j-1301593316.sh.apigw.tencentcs.com/release/video");
      return {
        Predictions : predictions.data.result,
        Stocks : stocks.data.result,
        Researches : researches.data.result,
        Investments : investments.data.result,
        videos : video.data.result.list
      }
    } 
}
</script>