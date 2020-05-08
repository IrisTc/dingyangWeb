# 项目简介

- dingyang1.0为原项目
- dingyang2.0为Vue重构项目
- dingyang-nuxt为Nuxt重构项目
- server-express为服务器端api server
- HYweb为纯html、js、css和模板引擎实现的简单网页
- spider用来爬取静态站点，可以看到SEO优化
- mock为之前的假数据

### dingyang1.0

原学长项目，原项目前端使用了`vue.js`框架，采用了拓展性语言`Sass`，`TypeScript`，基本的响应式开发（网格布局），不支持IE浏览器。前后端分离，后端语言使用C#

### dingyang2.0

从静态页面+传统后端渲染 过渡到 **vue的前端渲染技术+api server后端的单页应用**

*由于Vue是很早完成的版本，在使用Nuxt框架之后就没有修改过，当时的接口和现在的不太一样，所以现在页面是没有数据的，如果需要的话可以自己添加mock数据或者将使用接口的地方修改成和nuxt一样的*

- 使用`vue-cli`脚手架工具开发，重新结构化原代码后，组件和页面分开

- `vue-li`是基于`webpack`模板的，可以直接进行插件配置实现打包过程

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

- 用babel转译模块化语法之后会报错`Uncaught ReferenceError: require is not defined`，也就是不支持模块化，用  [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill) 插件可以解决这个问题，它会在全局变量上添加一些类似于原生的方法。注意要添加配置

  ```js
  //build/webpack.base.conf
  entry: ['babel-polyfill', './src/main.js'],
  ```

- vue中可以直接用sass语法，但是得安装相关包`node-sass sass-loader`

- 使用bootstrap支持响应式和兼容IE，具体用到了栅格系统和导航栏组件等

  相关文档： https://v3.bootcss.com/css/ 

- Vue项目打包后路径问题的解决办法

  ```js
  //confing/index.js
  assetsPublicPath: './'
  ```

- vue的样式默认是全局的，所以需要设置scoped确保局部使用，避免全局污染

### dingyang-nuxt

**服务端渲染/生成静态站点方案**

- 基本就是把Vue项目移植过来，项目目录结构和动态路由不太一样

  相关文档： https://www.nuxtjs.cn/guide 

- `npm run build` 可以实现服务器渲染

- `npm run generate` 可以编译出静态化页面， 每个对应的页面都会生成一个文件夹里面有个`html`文件，相当于展示出来是一个完全静态的网站

- 用到的Vue组件

  - vue-markdown

    支持渲染markdown格式文本

  - vue-meditor

    markdown编辑器

  - vue-cropper

    功能全覆盖的裁剪图片工具

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

### server-express

- 数据库使用的是MongoDB，服务器端用Node.js搭建了一个简单的基于Express框架的运行环境，目前云函数和服务器端都有相同的接口

- 接口调用：

  URL前缀：`dy.tcualhp/api`

  获取所有文章信息：

  `GET    /article`

  获取某类型文章信息：

  `GET    /article?type=`

  获取所有视频信息(暂无分类)：
  
  `GET    /video`
  
  添加文章：
  

`POST    /article/add`

数据格式：

```json
  {
    "title": "标题",
    "description": "简介",
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

- 我直接使用`serverless framework`快速搭建了Express框架并部署，接口同服务器端，只有针对dy.tcualhp.cn的接口

  URL前缀：`http://service-jex1lh0j-1301593316.sh.apigw.tencentcs.com/release`

  相关文档： https://cloud.tencent.com/document/product/1154/39269 

- 后来加上了hy.tcualhp.cn的接口如下

  获取某类文章信息：

  `GET    /huayin/article?type=`
  
  增加某类文章（新闻或报告）：
  
  `POST    /huayin/article/add`
  
  数据格式
  
  ```
  {
      "title" : "华银德洋基金S26669分红公告",
      "description" : "这里是简介",
      "content" : "这里是正文",
      "type" : "news"
  }
  ```
  
  获取其他信息：
  
  `GET    /huayin/other?type=`
  
  ```
  {
      "type" : "about",
      "typeTitle" : "关于我们",
      "content" : "深圳市华银精治资产管理公司是全国顶尖的私募基金管理机构。公司成立于2007年。业务范围涵盖私募基金管理、上市公司、定向增发、股权激励等。\n2009年公司被人大聘为《基金法》立法起草小组顾问，2013年5月华银精治在前海股权交易所成功上市。2014年4月公司获得中国基金业协会首批特别会员资格。\n作为第一批拥有合法牌照的财富管理机构，我们意识到，中国的财富管理行业将面临空前的发展契机，对私募机构和投资人来说，都将面临一波大行情的起点。华银精治拥有多年的财富管理经验，在基金投资、基金销售、政策法规、内控管理各方面理解深刻，具有丰富的运作经验。\n投资需要信仰，更需要善意。华银精治更希望给投资者提供一个创新平台，在法务、投资、市场等各个合伙角度上，迎来财富管理行业的美好明天。"
  }
  ```
  
  

### HYweb

使用了jQuery和template-web（模板引擎）

- template-web相当于实现了Vue的前端数据绑定功能
- jQuery用来实现了一些动画效果

### dingyang-admin

因为管理不需要SEO优化，所以直接用Vue编写的SPA，可以实现文章内容和视频内容的上传，数据上传至数据库，图片和视频传上至存储桶，上传时触发服务端Nuxt项目进行重新编译，可以直接生成新的静态站点，也每次将新生成的dist文件夹上传到对象存储中，但是因为本身就已经用的服务器编译，所以我就直接在服务器上创建的静态站点，这样便可以实现服务器预渲染的效果

##### 对象存储

- 对象存储（Cloud Object Storage，COS）是腾讯云提供的 一种存储海量文件的分布式存储服务，用户可通过网络随时存储和查看数据 
- 例如，创建了一个叫dingyang-admin的存储桶（名字后面会自动加上你的appid），里面有coverImg和video两个文件夹，便可以这样访问里面的图片：`https://dingyang-admin-1301593316.cos.ap-guangzhou.myqcloud.com/coverImg/1.jpg`

##### 存储

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

### 云服务

##### 技术理解

- Serverless，即无服务器架构，它包含两个部分，函数及服务（FaaS）和后端及服务（BaaS），函数提供的是计算能力，后端提供的是存储能力，比如对象存储，数据库应用，缓存服务。我的理解就是把原来一个服务器上的功能抽象化，分成了不同的部分，提供不同的服务，而这样做的最大的好处就是节省了服务器的空闲资源，你可以根据需求调节资源的大小，也可以很方便地进行代码的管理和迁移，或许我理解也有点偏差，实际上封装的每个功能也会处理得更加人性化，尽可能让使用者专注于编写核心代码，但是这样的话也就是没有一个固定的开发环境，每次都要进行配置运行条件等，所以Serverless Framework大概是解决这个问题的
- Serverless Framework 是无服务器应用框架，开发者无需关心底层资源即可快速部署完整可用的Serverless 应用架构，就相当于是一个应用模板工具，方便开发者的。官方介绍是一个标准化、组件化 的 Serverless 应用开发产品 ，我去看了一下组件的源码，实际上就是帮你写好了配置文件和入口函数，当部署应用时，它会根据你选择的应用的特性，自动完成云函数、API 网关、COS 等基础资源的部署和配置，不需要再手动部署配置每一项基础资源，比如部署Express框架，部署云存储服务等等

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

##### 