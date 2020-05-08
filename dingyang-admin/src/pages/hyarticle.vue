<template>
  <div class="new-article">
    <div class="top">
      <div>
        <h2>hy.tcualhp.cn</h2>
        <h2>新增文章</h2>
      </div>
      <button
        :disabled="(title && category) ? null : 'disbaled'"
        @click="post"
      >发布</button>
    </div>
    <div class="tips">
      <div class="editor">
        <div class="category">
          <h3>类别</h3>
          <select v-model="category">
            <option value="news">新闻</option>
            <option value="report">报告</option>
          </select>
        </div>
        <div class="title">
          <h3>标题</h3>
          <input
            type="text"
            v-model="title"
          >
        </div>
        <div class="description">
          <h3 class="i">简介</h3>
          <textarea
            type="textarea"
            v-model="description"
          />
          </div>
    </div>
  </div>
  <div class="content-header">
    <h3>正文</h3>
    <mark-down
      @on-save="saveMd"
      ref="md"
      v-model="convalue"
    ></mark-down>
  </div>
  <div class="tip" v-show="showTip">
    <h3>{{tip}}</h3>
  </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../assets/style/article.scss';
</style>
<script>
import MarkDown from "vue-meditor";
import axios from "axios";
import fs from "fs";

export default {
  components: {
    MarkDown
  },
  data() {
    return {
      title: "",
      category: "",
      description: "",
      content: "",
      html:"",
      convalue: "",
      showTip: false,
      tip: ""
    };
  },
  methods: {
    saveMd(content) {
      this.html = content.html;
      this.content = content.value;
    },

    async post() {
      this.$refs.md.handleSave();
      let data = {
        title: this.title,
        description: this.description,
        content: this.html,
        type: this.category
      };

      this.showTip = true;
      this.tip = "正在上传，请稍等...";
      
      const url = "/api/huayin/article/add";
      var that = this;
      await axios
        .post(url, JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then(function(response) {
          that.tip = "保存成功";
          setTimeout(function() {
            that.tipCard = false;
            Object.assign(that.$data, that.$options.data());
            that.convalue = "";
          }, 500);
        });
    }
  }
};
</script> 