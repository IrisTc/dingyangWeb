import Vue from '../../../core/vue/index.js'
import { axios } from '../../../core/axios/axios.js'
import { ArticleDetail } from '../../article-view/article-view.js'

let lastUrl = ''
type Article = ArticleDetail & { category: string }
export default Vue.extend({
  template: /*html*/`
    <div class="new-article">
      <div class="editor">
        <h2>{{id ? '编辑文章' : '新增文章'}}</h2>
        <div class="item title">
          <h3>标题</h3>
          <input type="text" v-model="title">
        </div>
        <div class="item description">
          <h3>简介</h3>
          <input type="text" v-model="description">
        </div>
        <div class="item category">
          <h3>类别</h3>
          <select v-model="category">
            <option value="predictions">今日预测</option>
            <option value="stocks">股市人生</option>
            <option value="reports">月度报告</option>
            <option value="investments">投资哲学</option>
            <option value="researches">实地调研</option>
          </select>
        </div>
        <div class="item cover">
          <h3>封面</h3>
          <input id="cover" type="file" accept="image/*" @change="changeFile">
          <label for="cover">
            <img :src="coverUrl">
          </label>
        </div>
        <div class="item content-header">
          <h3>正文</h3>
          <label for="edit" class="tab">
            <input type="radio" id="edit" name="mode" value="edit" checked v-model="editMode">
            <div class="text">编辑</div>
          </label>
          <label for="preview" class="tab">
            <input type="radio" id="preview" name="mode" value="preview" v-model="editMode">
            <div class="text">预览</div>
          </label>
        </div>
        <div class="item content">
          <textarea v-if="editMode === 'edit'" v-model="content"></textarea>
          <article v-else class="markdown"><vue-markdown>{{content}}</vue-markdown></article>
        </div>
        <div class="item buttons">
          <button @click="post">保存</button>
        </div>
      </div>
      <div class="article-list">
        <div class="header">
          <h2>文章列表</h2>
          <input class="search" type="text" v-model="search" placeholder="搜索">
        </div>
        <div class="article-item" v-for="a of articleDisplayList" :key="a.id">
          <img :src="'../assets/covers/' + a.coverUrl" class="cover">
          <h3 class="title" @click="editArticle(a)">{{a.title}}</h3>
          <div class="description">{{a.description}}</div>
          <icon @click.native="toggleMenu" class="menu-icon" name="dots-horizontal" margin=""></icon>
          <div class="menu">
            <button @click="editArticle(a)">编辑</button>
            <button @click="deleteArticle(a)">删除</button>
          </div>
        </div>
      </div>
    </div>
  `,
  components: {
    Icon: () => import('../../icon/icon.js')
  },
  data() {
    return {
      id: undefined,
      title: '',
      description: '',
      category: '',
      cover: null,
      coverFilename: '',
      content: '',
      articleList: [],
      editMode: 'edit',
      search: '',
    }
  },
  computed: {
    articleDisplayList() {
      if (!this.search) {
        return this.articleList.slice(0, 10)
      } else {
        return this.articleList.filter((a: Article) => {
          return (a.title + a.description + a.content).includes(this.search)
        }).slice(0, 10)
      }
    },
    coverUrl() {
      if (this.coverFilename) {
        return '../assets/covers/' + this.coverFilename
      } else {
        if (this.cover === null) {
          return 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"></svg>'
        }
        if (lastUrl) {
          console.log('revoke', lastUrl)
          URL.revokeObjectURL(lastUrl)
        }
        lastUrl = URL.createObjectURL(this.cover)
        console.log('create', lastUrl)
        return lastUrl
      }
    }
  },
  async mounted() {
    const response = await axios.get(`http://localhost:5000/article/all`)
    this.articleList = response.data
  },
  methods: {
    toggleMenu(e: MouseEvent) {
      const element = e.target as HTMLElement
      const menu = element.nextElementSibling as HTMLElement
      menu.classList.toggle('opened')
      document.addEventListener('click', () => {
        menu.classList.toggle('opened')
      }, { once: true, capture: true })
    },
    async deleteArticle(article: Article) {
      const url = `http://localhost:5000/article/delete/${article.id}`
      const response = await axios.get(url)
      if (response.status === 200) {
        this.articleList.splice(this.articleList.indexOf(article), 1)
      }
    },
    async editArticle(article: Article) {
      console.log('edit', article.id)
      this.id = article.id
      this.title = article.title
      this.description = article.description
      this.category = article.category
      this.content = article.content
      this.editMode = 'edit'
      this.coverFilename = article.coverUrl
      this.search = ''
    },
    async post() {
      const url = `http://localhost:5000/article/`
      const response = await axios.post(url, {
        id: this.id,
        content: this.content,
        date: new Date(),
        coverUrl: this.coverFilename,
        description: this.description,
        title: this.title,
        category: this.category,
      })
      if (response.status === 200) {
        if (this.id) {
          this.articleList.push(response.data)
        }
        alert('保存成功')
      }
    },
    async changeFile(e: Event) {
      const files = (e.target as HTMLInputElement).files
      if (!files) {
        return
      }
      const file = this.cover = files[0]
      const formData = new FormData()
      formData.append('coverFile', file)
      const response = await axios.post('http://localhost:5000/article/cover', formData, {
        responseType: 'text',
      })
      console.log(response)
      this.coverFilename = response.data
    },
  },
})