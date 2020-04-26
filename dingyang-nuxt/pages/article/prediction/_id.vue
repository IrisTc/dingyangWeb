<template>
    <div>
      <article-view :type="'prediction'" :articles="article" :id-init="id"></article-view>
    </div>
</template>
<script>
import ArticleView from '~/components/Article'
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
    async asyncData () {
      const result = await axios.get("http://service-jex1lh0j-1301593316.sh.apigw.tencentcs.com/release/article?type=prediction");
      
      const articles = result.data.result
      return {
        article : articles
      }
    }
}
</script>