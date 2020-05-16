<template>
  <div class="markdown">
    <vue-markdown :source="article"></vue-markdown>
  </div>
</template>
<style lang="sass">
@import '~assets/style/markdown.scss'
</style>
<script>
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
  async asyncData () {
      const books = await axios.get("http://service-jex1lh0j-1301593316.sh.apigw.tencentcs.com/release/book");
      return {
        article: books.data.result[0].content
      }
  }
};
</script>