# 丁洋网站重构项目

## 目录结构
- src 前端源码
  - core 第三方库: axios, vue, vue-markdown, vue-router
  - dingyang 网站源码
    - backend 后端测试用服务器
- docs 前端文件输出目录
  - assets 素材
- images 一些效果图

## 开发环境
### 前端
#### 所需工具

- TypeScript: `npm i -g typescript`
- Sass: `npm i -g sass`
- HTTP Server: `npm i -g http-server`

#### 编译命令
TypeScript:
```powershell
tsc --watch
```

Sass:
```powershell
sass --no-source-map --watch src:docs
```

前端文件服务器:
```powershell
cd docs
http-server -c-1
```

#### 运行
##### 浏览器环境
Chrome >= 63
Firefox >= 67
Opera >= 50
Safari >= 11.1

##### 入口
http://127.0.0.1/index.html

### 后端服务器
#### 所需工具
- .NET Core >= 3.1
- EF Core

#### 编译运行
```powershell
cd src/dingyang/backend/DingYangServer
dotnet watch run
```
