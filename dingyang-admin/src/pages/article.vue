<template>
  <div class="new-article">
    <div class="top">
      <div>
        <h2>dy.tcualhp.cn</h2>
        <h2>新增文章</h2>
      </div>
      <button
        :disabled="(title && category) ? null : 'disbaled'"
        @click="post"
      >发布</button>
    </div>
    <div class="tips">
      <div class="editor col-lg-7 col-md-6 col-sm-12 col-xs-12">
        <div class="category">
          <h3>类别</h3>
          <select v-model="category">
            <option value="prediction">今日预测</option>
            <option value="stock">股市人生</option>
            <option value="report">月度报告</option>
            <option value="investment">投资哲学</option>
            <option value="research">实地调研</option>
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
    <div class="cover col-lg-5 col-md-6 col-sm-12 col-xs-12">
      <h3>封面</h3>
      <div class="image"><img :src="imgUrl"></div>
      <p>已使用默认封面</p>
      <!-- <button class="c-btn" @click="crop">更换封面</button> -->
      <input
        id="cover"
        type="file"
        accept="image/*"
        @change="changeFile"
      >
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
  <div class="show-crop" v-show="cropper">
				<h3>请按规定比例裁剪</h3>
				<div class="cropper">
					<vueCropper
						ref="cropper"
						:img="option.img"
						:outputSize="option.size"
						:outputType="option.outputType"
						:info="true"
						:full="option.full"
						:canMove="option.canMove"
						:canMoveBox="option.canMoveBox"
						:fixedBox="option.fixedBox"
						:original="option.original"
						:autoCrop="option.autoCrop"
						:autoCropWidth="option.autoCropWidth"
						:autoCropHeight="option.autoCropHeight"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
						:centerBox="option.centerBox"
						:high="option.high"
						:infoTrue="option.infoTrue"
            :maxImgSize="option.maxImgSize"
						:enlarge="option.enlarge"
						:mode="option.mode"
            :limitMinSize="option.limitMinSize"
					></vueCropper>
				</div>
        <div class="enssure"><button @click="uploadFile">确定</button></div>
  </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../assets/style/article.scss';
</style>
<script>
import MarkDown from "vue-meditor";
import axios from "axios";
import Cos from "cos-js-sdk-v5";
import fs from "fs";
import { VueCropper } from "vue-cropper";

export default {
  components: {
    MarkDown,
    VueCropper
  },
  data() {
    return {
      title: "",
      category: "",
      coverUrl: "logo.jpg",
      imgUrl:
        "https://dingyang-admin-1301593316.cos.ap-guangzhou.myqcloud.com/coverImg/logo.jpg",
      description: "",
      content: "",
      html:"",
      convalue: "",
      showTip: false,
      tip: "",
      cropper: false,
      option: {
        //img的路径自行修改
        img: "",
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 337,
        autoCropHeight: 440,
        fixed: true, //是否开启截图框宽高固定比例
        fixedNumber: [229, 299], //截图框的宽高比例
        centerBox: false,
        high: false,
        cropData: {},
        enlarge: 1,
        mode: "contain",
        maxImgSize: 2000,
        limitMinSize: [100, 120]
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
        title: this.title,
        description: this.description,
        content: this.content,
        type: this.category,
        coverUrl: this.coverUrl
      };

      this.showTip = true;
      this.tip = "正在编译，请稍等...";
      
      const url = "/api/dingyang/article/add";
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
    },

    async changeFile(e) {
      const files = e.target.files;
      if (!files) {
        return;
      }
      const file = files[0];
      var render = new FileReader();
      render.readAsDataURL(file);
      render.onload = () => {
        this.option.img = render.result;
      };
      this.cropper = true;
    },

    uploadFile() {
      const cos = new Cos({
        SecretId: "**********************",
        SecretKey: "**************************"
      });

      let filename = Date.now() + ".jpg";
      this.coverUrl = filename;

      var that = this;
      this.$refs.cropper.getCropBlob(data => {
        let file = new window.File([data], filename, {
          type: data.type
        });
        cos.putObject(
          {
            Bucket: "******************" /* 必须 */,
            Region: "ap-guangzhou" /* 必须 */,
            Key: "coverImg/" + filename /* 必须 */,
            StorageClass: "STANDARD",
            Body: file // 上传文件对象
          },
          function(err, data) {
            that.imgUrl = "https://" + data.Location;
            that.cropper = false;
            alert("图片上传成功");
          }
        );
      });
    }
  }
};
</script> 