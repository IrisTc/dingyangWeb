<template>
    <div>
      <article-view :type="'investments'" :articles="article" :id-init="id"></article-view>
    </div>
</template>
<script>
import ArticleView from './../components/Article'
import axios from 'axios'
export default {
    components: {
        ArticleView
    },
    props: ['id'],
    data() {
      return {
        article: [],
      }
    },
    mounted() {
        this.getArticles();
    },
    methods: {
        getArticles(){
          axios.get("https://service-neh664ng-1301593316.gz.apigw.tencentcs.com/release/article").then((result)=>{
            var res = result.data[0];
            this.article = res.Predictions;      
          })
        },
    }
}
</script>