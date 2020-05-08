<template>
  <div class="new-article">
    <div class="top">
      <div>
        <h2>hy.tcualhp.cn</h2>
        <h2>更新其他内容</h2>
      </div>
      <button
        :disabled="(convalue && category) ? null : 'disbaled'"
        @click="post"
      >发布</button>
    </div>
    <div class="tips">
      <div class="editor">
        <div class="category">
          <h3>类别</h3>
          <select v-model="category">
            <option value="about">关于我们</option>
            <option value="team">投资团队</option>
            <option value="process">认购流程</option>
            <option value="manage">财富管理</option>
            <option value="adviser">财务顾问</option>
            <option value="steward">私募管家</option>
            <option value="idea">投资理念</option>
          </select>
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
      category: "",
      content: "",
      html:"",
      convalue: "",
      showTip: false,
      tip: "",
      list: {
        "about": "关于我们",
        "team": "投资团队",
        "process": "认购流程",
        "manage": "财富管理",
        "adviser": "财务顾问",
        "steward": "私募管家",
        "idea": "投资理念"
      }
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
        content: this.html,
        type: this.category,
        typeTitle: this.list[this.category]
      };
      console.log(data)

      this.showTip = true;
      this.tip = "正在上传，请稍等...";
      
      const url = "/api/huayin/other/add";
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