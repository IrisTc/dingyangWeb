const axios = require('axios')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '丁洋',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: '丁洋个人网站', name: '丁洋', content: '私募基金，私募总冠军，基金管理，博弈理论，实战手筋-操盘黑客理论，短线手筋-股市黑客理论' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }
    ],
    script: [
      { src: '/lib/jquery.min.js'},
      { src:'/lib/bootstrap/js/bootstrap.min.js'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Global CSS
  */
 css: [
    '@assets/reset.css',
    '@static/lib/bootstrap/css/bootstrap.min.css'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  generate: {
    routes: function (callback){
      return axios.get("http://service-jex1lh0j-1301593316.sh.apigw.tencentcs.com/release/count").then((res) => {
        const routes = res.data.result.map((item) => {
          if(item.type === 'article'){
              return '/article/' + item.category +'/' + item.id
          }
          else{
              return '/video/' + item.id
          }          
        })
        callback(null, routes)
      })
    }
  }
}
