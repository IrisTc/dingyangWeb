<template>
  <div class="book markdown">
    <vue-markdown :source="article"></vue-markdown>
  </div>
</template>
<style scoped>
@media screen and (max-width: 1368px) {
  .book {
    padding: 0 10vw;
  }
}
@media screen and (max-width: 699px) {
  .book {
    padding: 0;
  }
}
</style>
<script>
import '../style/markdown.scss'
import VueMarkdown from "vue-markdown";
import axios from "axios";
export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      article: ""
    };
  },
  mounted() {
    axios.get("https://service-oo3osz5y-1301593316.gz.apigw.tencentcs.com/release/book").then(result => {
      console.log(result);
      var books = result.data;
      this.article = books[0].content;
    });
  }
};
</script>