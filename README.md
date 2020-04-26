typora-copy-images-to: ./

## 结题报告

*陶莎 18271407*

### 项目简介

#### 原项目概况

原项目前端使用了`vue.js`框架，采用了拓展性语言`Sass`，`TypeScript`，基本的响应式开发（网格布局），不支持IE浏览器。前后端分离，后端语言使用C#

#### 需改进的地方

- ES6语法不支持IE11以下的版本
- 原项目的网格布局不兼容IE
- 项目结构混乱，不利于维护
- 单页应用不利于SEO

### 开发过程记录

#### Vue项目重构

##### 技术理解

从静态页面+传统后端渲染 过渡到 **vue的前端渲染技术+api server后端的单页应用**

- 传统的后端渲染是在Vue、React等前端渲染技术出来之前，由后端MVC框架完成，返回给用户的是一个静态的HTML文件，这种模式的缺点就在于编写后端的时候需要看前端页面的代码，将数据套进模板，而在这个过程中逻辑分散，如果是多人合作那么前端和后端的技术人员需要去处理更多的东西。React/Vue/Anguar等前端框架出来之后便有了前端渲染的概念，即前端取到数据后利用模板引擎直接在页面中使用，整个页面部分完全由前端部分编写，此时后端可以专注于业务领域，只需提供数据接口服务（API server）即可，不用接触前端页面的部分，这时便实现了前后端完全分离
-  Vue是一个渐进性框架，可以通过添加组件系统、客户端路由、大规模状态管理来构建一个完整的框架，这些功能相互独立，可以在核心功能的基础上任意选用其他的部件，不一定要全部整合在一起 ，它的核心的功能，是一个视图模板引擎，能够实现数据的双向绑定，可以非常方便快速地实现一个单页应用。

##### 优化代码结构

- 原项目每个页面一个文件夹，内部有`scss`、`typescript`文件以及组件的文件夹

- 使用`vue-cli`脚手架工具开发，重新结构化原代码后，组件和页面分开，复用性强，结构更加易懂，便于他人后期维护

  <img src="G:\创新实践结题报告\10000-1587095499231.PNG" alt="10000-w100" style="zoom:70%;" />         <img src="G:\创新实践结题报告\998-1587096175120.PNG" alt="998-w" style="zoom:70%;" />

##### 利用语法解析转换工具使其兼容IE浏览器

- `Babel`是广泛使用的`ES6`转码器，可以将`ES6`代码转为`ES5`代码，从而在现有环境执行，除此之外类似的工具还有`traceur`, ` jsx`, ` es6-shim`

- 因为`vue-li`是基于`webpack`模板的，可以直接进行插件配置实现打包过程

  - `webpack`中一个非常重要的功能是`Plugins` ， 要使用某个插件，只需要需要通过`npm`安装它就可以了，不需要再引入`js`包

  - 现在主流的前端构建工具有`webpack`和`browserify`。 `webpack`相比`browserify`，更加傻瓜式、一体化。而`browserify`则需要自行配置。相对的，进行源码分析和改进时，`webpack`更加复杂，而`browserify`则比较容易

  - `webpack`也可以直接配置mock数据

    ```js
    //webpack.dev.conf
    const express = require('express')
    const app = express()
    const appData = require('./../src/mock/article.json')
    var apiRoutes = express.Router()
    app.use('/api', apiRoutes)
    
    //在devSever里面添加
    before(app){
          app.get('/api/article',(req,res)=>{
            res.json({
              error: 0,
              data: appData
            })
          })
        }
    
    var res = result.data;
    ```

    

- **问题**

  - 用babel转译模块化语法之后会报错`Uncaught ReferenceError: require is not defined`，也就是不支持模块化

    - Babel 默认只转换新的 JavaScript 句法，而不转换新的` API` ，比如` Iterator`、`Generator`、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如` Object.assign`）都不会转码，而且它不支持模块化，而`vue`的组件化恰恰使用了这一特性

    - `ES6`的模块化的特点是可以导入和导出各种类型的变量；每个模块内声明的变量都是局部变量，不会污染全局作用域；每个模块只加载一次，下次直接从内存中读取，这无疑是非常好用的，可以减少很多代码的工作量，chrome可以兼容模块化的语法，但是IE不可以

    - 解决办法：查阅资料发现可以用  [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill) 插件可以解决这个问题，它会在全局变量上添加一些类似于原生的方法。注意要添加配置

      ```js
      //build/webpack.base.conf
      entry: ['babel-polyfill', './src/main.js'],
      ```

      

  - vue中可以直接用sass语法，但是得安装相关包`node-sass sass-loader`，网上很多让加配置，但其实`vue-cli3`已经把sass-loader配置好了，加上之后报错，重复配置了

    由于安装的sass-loader版本太高会报错

    `"sass-loader": "^8.0.0" 可以更换成 "sass-loader": "^7.3.1",`

##### 改写样式使其兼容IE浏览器

- Grid布局在IE中的兼容有问题，因为IE没有自动流动的网格元素，需要为每个网格元素分配一个特定的网格位置，所以也不是直接加上前缀-ms-就行，不如重新用前端框架重新布局

  - 所有的主流浏览器都支持 Bootstrap，包括IE。  Bootstrap 的响应式 `CSS` 能够自适应于台式机、平板电脑和手机。  Bootstrap 提供了一个带有网格系统、链接样式、背景的基本结构。  Bootstrap 包含了十几个可重用的组件，用于创建图像、下拉菜单、导航、警告框、弹出框等等

  - 使用了bootstrap的栅格系统，系统会自动分为12列，可以根据视口大小而改变每个栅格对应的列数，所以原项目关于的媒体查询的大量`css`代码都可以不用写

    ```html
    <div class="article col-md-7 col-xs-12" v-if="current">
            <div class="title">
              <h1>{{current.title}}</h1>
              <div class="date"><icon margin="right" name="clock-outline"></icon>{{current.date}}</div>
            </div>
            <article class="markdown">
              <vue-markdown :source="current.content"></vue-markdown>
            </article>
            <div class="back-to-top" @click="backToTop()"><icon margin="right" name="triangle"></icon>返回顶部</div>
          </div>
          <div class="other-articles col-md-5 col-xs-12" v-if="otherArticles">
            <div class="title">
              <div class="dot"></div>
              往期回顾
            </div>
            <div class="article-grid row">
              <a v-for="(a, index) of otherArticles.slice(0, 3)" :key="index" class="col-md-5 col-xs-5" :class="{'image-item': index === 0,   'card-item': index !== 0}" @click="changeArticle(a)">
                <img v-if="index === 0" class="background" :src="'static/covers/' + a.coverUrl">
                <div v-if="index !== 0" class="border"></div>
                <div class="content">
                  <h1>{{a.title}}</h1>
                  <p>{{a.description}}</p>
                </div>
              </a>
            </div>
            <a v-for="a of otherArticles.slice(3)" :key="a.id" class="normal-item" @click="changeArticle(a)">
              <div class="title">{{a.title}}</div>
              <div class="date">{{a.date}}</div>
              <icon margin="left" name="chevron-right"></icon>
            </a>
          </div>
    ```

  - 响应式组件，直接将原项目手写的大量导航代码改成了bootstrap的组件，在移动设备上可以折叠（并且可开可关），且在视口（viewport）宽度增加时逐渐变为水平展开模式

    ```html
    <div class="navbar-header">
              <button @click="closeList()" @touchstart="closeList()" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <router-link to="/home" class="navbar-brand logo">
                <img src="../assets/logo.svg" height="64">
                <p>丁洋</p>
              </router-link>
            </div>
    
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav navbar-right">
                <li class="c"><router-link to="/articles/predictions/1">今日预测</router-link></li>
                <li class="c"><router-link to="/articles/stocks/1">股市人生</router-link></li>
                <li class="c"><router-link to="/articles/reports/1">月度报告</router-link></li>
                <li class="c"><router-link to="/articles/investments/1">投资哲学</router-link></li>
                <li class="c"><router-link to="/articles/researches/1">实地调研</router-link></li> 
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">关于丁洋<span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li class="c"><router-link to="/intro">丁洋简介</router-link></li>
                    <li class="c"><router-link to="/video/1">精彩视频</router-link></li>
                    <li class="c"><router-link to="/book">实战手筋</router-link></li>
                    <li class="c"><router-link to="/duty">信念使命</router-link></li> 
                  </ul>
                </li>
              </ul>
            </div><!-- /.navbar-collapse -->
    ```

- **问题**

  - 通过v-bind绑定图片

    在通过v-for循环绑定图片的`src`的时候，`vue`会把相对地址解析为一个字符串，而非一个地址这就导致图片无法加载 

    -  解决办法：把图片放入`vue-cli3`自动生成的public下，不用`src`中的相对路径
       `'…/assets/img1.png'`改为`'images/img.png'`

  - `SEC7113: CSS 因 Mime 类型不匹配而被忽略`

    - MIME类型就是设定某种指定扩展名的文件用一种应用程序来打开的方式类型，当该扩展名文件被访问的时候，浏览器会自动使用指定应用程序来打开

    - 在IE9的新安全机制中，要求web服务器返回的http 头信息中content-type必需写明css文件的MIME-type为'text/css'，否则IE9不会将它作为css文件来处理
    - 解决方法：如果想要IE9也能正确的显示css文件定义的样式，需要修改服务器端返回给客户端的css文件的http header头信息中对应的mime类型

  - Vue项目打包后路径问题的解决办法

    ```js
    //confing/index.js
    assetsPublicPath: './'
    ```

  - vue的样式默认是全局的，所以需要设置scoped确保局部使用，避免全局污染

#### SEO优化——Nuxt重构

##### 技术理解

服务端渲染/生成静态站点

- 因为用`Vue`搭建的是单页应用，` html`在服务器端还没有渲染部分数据数据，在浏览器才渲染出数据，而搜索引擎请求到的`html`是没有渲染数据的，这样就很不利于内容被搜索引擎搜索到
- Nuxt是基于Vue的一个应用框架，采用服务端渲染或者生成静态站点的方式实现SEO提升。服务器端渲染（SSR）是用Node.js服务器将基于Vue的组件渲染成HTML并传输到客户端，而不是纯js；Nuxt.js支持基于Vue应用程序生成静态站点，不需要服务器就能实现SEO，Nuxt会将预先渲染所有的页面。
##### vuepress

  - 每一个由` VuePress` 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，`Vue` 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载
  - 个人认为每次增加md文件都要配置文件路径，作为笔记的话没有gitbook方便，它比较适合写一次性不经常增加的项目文档。因为Vuepress充分利用了  vue、vue-router，vue ssr 等技术 ，可以让文档编写者更快捷地专注于写文档，而开发者也可以在markdown中使用Vue组件，可以进行很好的拓展。

##### Nuxt.js

- `Vue`官方提供了几个解决SEO优化问题的方法，老师建议的是用Nuxt.js，去官方文档看写的挺详细的，确实很好上手，基本上就是把原项目直接移植过来

  <img src="https://img-blog.csdnimg.cn/20200319212859830.PNG" alt="-" style="zoom:70%;" />

- `npm run build` 可以实现服务器渲染

- `npm run generate` 可以编译出静态化页面， 每个对应的页面都会生成一个文件夹里面有个`html`文件，相当于展示出来是一个完全静态的网站

- 用到的Vue组件

  - vue-markdown

    支持渲染markdown格式文本

  - vue-meditor

    markdown编辑器

  - vue-cropper

    功能全覆盖的裁剪图片工具

- **问题**

  - 在 Nuxt.js 执行 `geneate` 命令时，动态路由会被忽略

    - 解决方法：如果想让 Nuxt.js 为动态路由也生成静态文件，需要指定动态路由参数的值，并配置到 `routes` 数组中去

    - 但是由于该项目的页面数量动态的而不是固定的，用户每添加一篇文章是要增加一个页面的，所以使用回调函数访问数据库返回

      ```js
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
      ```


#### 后端接口编写

- 服务器端用Node.js搭建了一个简单的基于Express框架的运行环境，可以调用接口从mongodb数据库取回数据和增加数据

  URL前缀：

  `admin.dy.tcualhp/api`

  获取所有文章信息：

  `GET    /article`

  获取某类型文章信息：

  `GET    /article?type=`

  获取所有视频信息(暂无分类)：

  `GET    /video`

  添加文章信息：

  `POST    /article/add`

  数据格式：

  ```json
  {
      "title": "标题",
      "desc": "简介",
      "content": "正文",
      "type": "stock",
      "coverUrl": "2020.jpg"
  }
  ```

  *后端接口会自动加上日期和id*

  添加视频信息:

   `POST	 /video/add`

  数据格式：

  ```json
  {
      "title": "标题",
      "coverUrl": "0202.jpg",
      "url": "20200202.mp4"
  }
  ```

- **问题**

  - 服务器端的端口问题解决办法
    - 检查阿里云的安全组
    - 查看Linux系统自带防火墙（如Ubuntu自带iptables）

  - 因为不太了解HTTP请求框架，POST请求传入数据一直没有反应，后来发现传入的参数形式是Request Payload
    - 解决办法：在请求头里设置`"Content-Type": "application/json; charset=UTF-8"`，确保传入的是`json`格式的参数就可以了，可以使用`JSON.stringify(data)`


#### 基于各类云服务的动态渲染单页应用方案

##### 技术理解

- Serverless，即无服务器架构，它包含两个部分，函数及服务（FaaS）和后端及服务（BaaS），函数提供的是计算能力，后端提供的是存储能力，比如对象存储，数据库应用，缓存服务。我的理解就是把原来一个服务器上的功能抽象化，分成了不同的部分，提供不同的服务，而这样做的最大的好处就是节省了服务器的空闲资源，你可以根据需求调节资源的大小，也可以很方便地进行代码的管理和迁移，或许我理解也有点偏差，实际上封装的每个功能也会处理得更加人性化，尽可能让使用者专注于编写核心代码，但是这样的话也就是没有一个固定的开发环境，每次都要进行配置运行条件等，所以Serverless Framework大概是解决这个问题的
-  Serverless Framework 是无服务器应用框架，开发者无需关心底层资源即可快速部署完整可用的Serverless 应用架构，就相当于是一个应用模板工具，方便开发者的。官方介绍是一个标准化、组件化 的 Serverless 应用开发产品 ，我去看了一下组件的源码，实际上就是帮你写好了配置文件和入口函数，当部署应用时，它会根据你选择的应用的特性，自动完成云函数、API 网关、COS 等基础资源的部署和配置，不需要再手动部署配置每一项基础资源，比如部署Express框架，部署云存储服务等等

所以我们可以将Nuxt.js框架build之后和api  server都部署至腾讯云的云函数，而数据库使用云数据库，图片资源放在腾讯云的对象存储桶中，这样便实现了完全无需服务器的支持动态渲染的单页应用

##### 部署Nuxt.js动态渲染单页应用

官方提供了该框架的组件，可以支持通过云函数和 API 网关在云端部署 Nuxt.js 框架 

- 可以通过npm安装Serverless

  ```
  npm install -g serverless
  ```

- 在本地初始化项目，npx是npm5.2之后发布的一个命令。官网说它是“execute npm package binaries”，就是执行npm依赖包的二进制文件，简而言之，就是我们可以使用npx来执行各种命令 

  ```
  npx create-nuxt-app serverlesss-nuxtjs
  ```

- 在根目录新建配置文件`serverless.yml`

  component即代表所使用的组件，这里写的是官方提供的tencent-nuxtjs组件，可以一键部署Nuxt.js框架，将代码压缩发布到云函数，并自动完成API网关的部署和配置

  ```
  # serverless.yml
  NuxtjsFunc:
    component: '@serverless/tencent-nuxtjs'
    inputs:
      functionName: nuxtjs-dingyang
      region: ap-guangzhou
      code: ./
      functionConf:
        timeout: 30
        memorySize: 128
      environment:
        variables:
          RUN_ENV: test
      apigatewayConf:
        protocols:
          - http
          - https
        environment: release
  ```

  详细配置在https://github.com/serverless-components/tencent-nuxtjs/blob/master/docs/configure.md 

- 之后执行serverless命令即可实现部署，中间会有个微信扫码登录的过程

- 由于云函数不可以在云上安装依赖，而项目node包过大，很难上传成功。原则上，因为build之后的项目是支持ssr渲染的，所以如果能上传的话，网站也是可以直接用的

##### 部署api  server 到云函数

- 云函数是腾讯云提供的一种无服务器执行环境 ，只需要使用平台支持的语言编写核心代码和设置代码运行的条件即可，云函数可以作为移动应用及 Web 应用的后端，实现服务端应用逻辑，并通过 API 对外提供服务 
- 可能由于云函数的执行环境是不确定的，所以不可以云端安装依赖，必须将用到的node包一起上传至云函数，而由于速度限制，如果项目依赖很多很容易上传失败

我直接使用`serverless framework`快速搭建了Express框架并部署，接口同服务器端

URL前缀：`http://service-jex1lh0j-1301593316.sh.apigw.tencentcs.com/release`

- 云函数可以直接在腾讯云的控制台创建，也可以在本地编写完成之后使用scf cli工具（VScode有tensent-scf插件）上传或者直接利用Serverless Framework部署官方提供的应用框架，该工具也支持在本地进行调试

- 配置参考： https://cloud.tencent.com/document/product/583/37510 

- 我部署的Express框架的yml配置：

  这里的tencent-express便是Express组件

  ```
  express:
    component: '@serverless/tencent-express'
    inputs:
      region: ap-shanghai
      runtime: Nodejs8.9
  ```

##### 对象存储

- 对象存储（Cloud Object Storage，COS）是腾讯云提供的 一种存储海量文件的分布式存储服务，用户可通过网络随时存储和查看数据 
- 例如，创建了一个叫dingyang-admin的存储桶（名字后面会自动加上你的appid），里面有coverImg和video两个文件夹，便可以这样访问里面的图片：`https://dingyang-admin-1301593316.cos.ap-guangzhou.myqcloud.com/coverImg/1.jpg`

#### 基于云部署+服务器预渲染的headless cms应用

##### 技术理解

- 传统CMS是在面向网页的框架中组织内容，所以相同内容无法适应其他的平台，而无头cms可以是任何类型的内容管理系统，其中内容存储库与表示层分离，通过这种方式可以解决不同平台和渠道之间的复用

##### 管理端页面

因为管理不需要SEO优化，所以直接用Vue编写的SPA，可以实现文章内容和视频内容的上传，数据上传至数据库，图片和视频传上至存储桶，上传时触发服务端Nuxt项目进行重新编译，可以直接生成新的静态站点，也每次将新生成的dist文件夹上传到对象存储中，但是因为本身就已经用的服务器编译，所以我就直接在服务器上创建的静态站点，这样便可以实现服务器预渲染的效果

##### 资源存储

- 图片和视频资源在前端直接上传至腾讯云的对象存储桶中，上传方式：

  ```js
  const cos = new Cos({
      SecretId: "************",
      SecretKey: "************"
    })
  var that = this
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
  )
  ```

- 在服务器端的api增加函数内部利用了shelljs插件编写了可以执行编译命令的代码，可以实现用户增加文章和视频即可触发nuxt项目重新编译

  ```js
  shell.cd('../dingyang-nuxt')
  if (shell.exec('npm run generate').code !== 0) {//执行npm run generate 命令
  	shell.echo('generate commit failed');
  	shell.exit(1);
  }
  ```

- 在云函数也可以设置对象存储COS作为函数触发器，在Bucket中有文件发生变更时即可获取事件通知，因此也可以针对事件进行变更文件的及时处理和业务通知。

  - 官方提供了事例：在 COS Bucket 上传图片，云函数可以立刻得到通知，并可以立刻获取图片进行相应的图片剪裁、缩略、水印等操作，实现图片的自动化处理，还可以在处理完成后写入数据库，便于后续选择使用已处理好的图片
  - 所以理想状态下，如果将Nuxt项目上传至云函数，当用户增加文章上传图片时即可触发云函数重新编译，再将新的打包文件上传至存储桶更新（静态网站可以直接将编译打包好的dist文件夹上传至云存储桶，分配API网关即可访问），即可用云服务实现纯静态化网站的实时编译。但是后来我用scf工具上传（用于上传云函数代码并直接部署）代码之后，因为项目过大会自动将项目打包成zip包传到了存储桶里面，云函数这边只有入口函数，也就不可能实现在云函数执行编译，所以最终还是选择在服务器执行编译的过程

### 总结和反思

- 在学长原项目上学到很多，比如使用拓展性语言Sass和Typescript，可以极大地提高开发效率和代码阅读性
- 体验到了现有前端框架的丰富和强大，利用好可以减少编写重复代码的工作量，更加专注于业务逻辑的编写，比如bootstrap提供的布局系统和基本组件，基本可以满足搭建一个网站的基本页面框架，而不用编写大量css代码；比如Vue可以通过简洁的API提供高效的数据绑定和灵活的组件系统，而手脚架提供了快速搭建应用的能力；而Nuxt提供了Vue缺少的服务端渲染的功能。
- 深入理解了组件化思想的重要性，每个组件实现一个特定的功能，再将各个组件引入页面中，组件代码逻辑集中，页面代码清晰，感觉很像Linux的思想——程序应该小而专一，即程序简单模块化。而且一个好的组件是可复用的，也就是说你写完这部分的逻辑，下次再用到的时候直接拿过来就行，减少重复劳动。而且优秀的组件也是可以分享和学习的，我现在才深切感受到了开源的意义，之前还处于比较封闭的学习状态，也不太会利用这些资源。
- 了解和体验了serverless的很多功能，比如云函数，云存储和serverlessframew，云开发应该是他们的一个功能集合的环境，还没有使用过，感觉这个技术和各个技术的融合还处于探索阶段，网上经验不太好找，很多尝试可能会失败，加了几个技术交流群大家也是在探讨可能可行的方案，但是确实是越来越多的人会接触和使用这些提供便利的功能



