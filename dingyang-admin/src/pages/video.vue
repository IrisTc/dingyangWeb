<template>
  <div>
    <div class="top">
      <h2>新增视频</h2>
      <button
        :disabled="(videoFilename && coverFilename) ? null : 'disbaled'"
        @click="post"
      >发布</button>
    </div>
    <div class="new-video">
      <div class="editor">
        <div class="item title">
          <h3>标题</h3>
          <input
            type="text"
            v-model="title"
          >
        </div>
        <div class="item cover">
          <h3>封面</h3>
          <input
            id="cover"
            type="file"
            accept="image/*"
            @change="changeCover"
          >
          <label for="cover">
            <img :src="coverUrl">
          </label>
        </div>
      </div>
      <div class="item video">
        <h3>视频文件</h3>
        <input
          id="video"
          type="file"
          accept="video/*"
          @change="changeVideo"
        >
        <label for="video">
          <video
            controls
            :src="videoUrl"
          ></video>
        </label>
      </div>
    </div>
    <div
      class="tip"
      v-show="showTip"
    >
      <h3>{{tip}}</h3>
    </div>
    <div
      class="show-crop"
      v-show="cropper"
    >
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
      <div class="enssure"><button @click="cropperCover">确定</button></div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../assets/style/video.scss';
</style>

<script>
import axios from "axios";
import Cos from "cos-js-sdk-v5";
import { VueCropper } from "vue-cropper";

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      coverFilename: "",
      coverUrl:
        "https://dingyang-admin-1301593316.cos.ap-guangzhou.myqcloud.com/coverImg/add.png",
      cropper: false,
      videoFilename: "",
      videoUrl: "",
      title: "",
      showTip: false,
      tip: "",
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
        autoCropWidth: 733,
        autoCropHeight: 440,
        fixed: true, //是否开启截图框宽高固定比例
        fixedNumber: [400, 240], //截图框的宽高比例
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
    changeCover(e) {
      const files = e.target.files;
      if (!files) {
        return;
      }
      this.coverFile = files[0];
      var render = new FileReader();
      render.readAsDataURL(this.coverFile);
      render.onload = () => {
        this.option.img = render.result;
      };
      this.cropper = true;
    },

    cropperCover() {
      let filename = Date.now() + ".jpg";
      this.coverFilename = filename;

      var that = this;
      this.$refs.cropper.getCropBlob(data => {
        var file = new window.File([data], filename, {
          type: data.type
        });

        const cos = new Cos({
          SecretId: "AKID2yVkjaEMJ0b25XqZ3HlynLbbOuhEcyrT",
          SecretKey: "1mHVUCLMzNUKl2SbLpBk3wZpojES9Zrj"
        });
        cos.putObject(
          {
            Bucket: "dingyang-admin-1301593316" /* 必须 */,
            Region: "ap-guangzhou" /* 必须 */,
            Key: "coverImg/" + filename /* 必须 */,
            StorageClass: "STANDARD",
            Body: file // 上传文件对象
          },
          function(err, data) {
            that.coverUrl = "https://" + data.Location;
            that.cropper = false;
            alert("图片上传成功");
          }
        );
      });
    },

    changeVideo(e) {
      const files = e.target.files;
      if (!files) {
        return;
      }
      var file = files[0];
      var filename = Date.now() + ".mp4";
      this.videoFilename = filename;

      const cos = new Cos({
        SecretId: "*******************************",
        SecretKey: "**********************************"
      });

      var that = this;
      cos.putObject(
        {
          Bucket: "dingyang-admin-1301593316" /* 必须 */,
          Region: "ap-guangzhou" /* 必须 */,
          Key: "videos/" + filename /* 必须 */,
          StorageClass: "STANDARD",
          Body: file // 上传文件对象
        },
        function(err, data) {
          that.videoUrl = "https://" + data.Location;
          alert("视频上传成功");
        }
      );
    },

    async post() {
      let data = {
        title: this.title,
        coverUrl: this.coverFilename,
        url: this.videoFilename
      };

      this.showTip = true;
      this.tip = "正在编译，请稍等...";

      const url = "/api/video/add";
      var that = this;
      await axios
        .post(url, JSON.stringify(data), {
          headers: {
            "content-type": "application/json; charset=UTF-8"
          }
        })
        .then(function(response) {
          that.tip = "保存成功";
          setTimeout(function() {
            that.tipCard = false;
            Object.assign(that.$data, that.$options.data());
          }, 500);
        });
    }
  }
};
</script>