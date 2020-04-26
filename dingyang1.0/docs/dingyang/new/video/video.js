import Vue from '../../../core/vue/index.js';
import { axios } from '../../../core/axios/axios.js';
let lastCoverUrl;
let lastVideoUrl;
export default Vue.extend({
    template: `
    <div class="new-video">
      <div class="editor">
        <h2>{{id ? '编辑视频' : '新增视频'}}</h2>
        <div class="item title">
          <h3>标题</h3>
          <input type="text" v-model="title">
        </div>
        <div class="item cover">
          <h3>封面</h3>
          <input id="cover" type="file" accept="image/*" @change="changeCover">
          <label for="cover">
            <img :src="coverUrl">
          </label>
        </div>
        <div class="item video">
          <h3>视频文件</h3>
          <input id="video" type="file" accept="video/*" @change="changeVideo">
          <label for="video">
            <video controls :src="videoUrl">
          </label>
        </div>
        <div class="item buttons">
          <button :disabled="(videoFilename && coverFilename) ? null : 'disbaled'" @click="post">保存</button>
        </div>
      </div>
      <div class="video-list">
        <div class="header">
          <h2>视频列表</h2>
          <input class="search" type="text" v-model="search" placeholder="搜索">
        </div>
        <div class="video-item" v-for="v of videoDisplayList" :key="v.id">
          <img :src="'../assets/covers/' + v.coverUrl" class="cover">
          <h3 class="title" @click="editVideo(v)">{{v.title}}</h3>
          <div class="date">{{v.date.toDateString()}}</div>
          <icon @click.native="toggleMenu" class="menu-icon" name="dots-horizontal" margin=""></icon>
          <div class="menu">
            <button @click="editVideo(v)">编辑</button>
            <button @click="deleteVideo(v)">删除</button>
          </div>
        </div>
      </div>
    </div>
  `,
    components: {
        Icon: () => import('../../icon/icon.js'),
    },
    data() {
        return {
            coverFile: null,
            coverFilename: '',
            videoFile: null,
            videoFilename: '',
            title: '',
            id: undefined,
            search: '',
            videoList: [],
        };
    },
    computed: {
        coverUrl() {
            if (this.coverFilename) {
                return '../assets/covers/' + this.coverFilename;
            }
            else {
                if (this.coverFile === null) {
                    return 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"></svg>';
                }
                if (lastCoverUrl) {
                    console.log('revoke', lastCoverUrl);
                    URL.revokeObjectURL(lastCoverUrl);
                }
                lastCoverUrl = URL.createObjectURL(this.coverFile);
                console.log('create', lastCoverUrl);
                return lastCoverUrl;
            }
        },
        videoUrl() {
            if (this.videoFilename) {
                return '../assets/videos/' + this.videoFilename;
            }
            else {
                if (this.videoFile === null) {
                    return null;
                }
                if (lastVideoUrl) {
                    console.log('revoke', lastVideoUrl);
                    URL.revokeObjectURL(lastVideoUrl);
                }
                lastVideoUrl = URL.createObjectURL(this.videoFile);
                console.log('create', lastVideoUrl);
                return lastVideoUrl;
            }
        },
        videoDisplayList() {
            if (!this.search) {
                return this.videoList.slice(0, 10);
            }
            else {
                return this.videoList.filter((v) => {
                    return (v.title).includes(this.search);
                }).slice(0, 10);
            }
        }
    },
    async mounted() {
        const response = await axios.get(`http://localhost:5000/video/all`);
        this.videoList = response.data.map((v) => {
            v.date = new Date(v.date);
            return v;
        });
    },
    methods: {
        toggleMenu(e) {
            const element = e.target;
            const menu = element.nextElementSibling;
            menu.classList.toggle('opened');
            document.addEventListener('click', () => {
                menu.classList.toggle('opened');
            }, { once: true, capture: true });
        },
        changeCover(e) {
            const files = e.target.files;
            if (!files) {
                return;
            }
            this.coverFile = files[0];
            this.uploadCover();
        },
        changeVideo(e) {
            const files = e.target.files;
            if (!files) {
                return;
            }
            this.videoFile = files[0];
            this.uploadVideo();
        },
        async editVideo(video) {
            console.log('edit', video.id);
            this.id = video.id;
            this.title = video.title;
            this.videoFilename = video.url;
            this.coverFilename = video.coverUrl;
            this.search = '';
        },
        async deleteVideo(video) {
            const url = `http://localhost:5000/video/delete/${video.id}`;
            const response = await axios.get(url);
            if (response.status === 200) {
                this.videoList.splice(this.videoList.indexOf(video), 1);
            }
        },
        async uploadCover() {
            const formData = new FormData();
            formData.append('coverFile', this.coverFile);
            const response = await axios.post('http://localhost:5000/video/cover', formData, {
                responseType: 'text',
            });
            console.log(response);
            this.coverFilename = response.data;
        },
        async uploadVideo() {
            const formData = new FormData();
            formData.append('videoFile', this.videoFile);
            const response = await axios.post('http://localhost:5000/video/video', formData, {
                responseType: 'text',
            });
            console.log(response);
            this.videoFilename = response.data;
        },
        async post() {
            const url = `http://localhost:5000/video/`;
            const response = await axios.post(url, {
                id: this.id,
                url: this.videoFilename,
                date: new Date(),
                coverUrl: this.coverFilename,
                title: this.title,
            });
            if (response.status === 200) {
                if (this.id) {
                    const video = response.data;
                    video.date = new Date(video.date);
                    this.videoList.push(video);
                }
                alert('保存成功');
            }
        }
    },
});
//# sourceMappingURL=video.js.map