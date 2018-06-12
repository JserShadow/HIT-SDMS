# HIT-SDMS

> HIT Students' Documents Management System
[TOC]
### 本地开发

```bash
# 安装依赖
npm install

# 在 http://localhost:8080 开启热更新服务
npm run dev

# 用压缩的代码构建生产环境
npm run build

# 构建生产环境并查看bundle analyzer报告
npm run build --report

# 运行单元测试
npm run unit

# 运行整体测试
npm test
```

想要了解更多Vue.js运行原理，请访问[指引](http://vuejs-templates.github.io/webpack/)和[vue-loader文档](http://vuejs.github.io/vue-loader)

### 前端路由
- 前端路由使用`vue-router`编写:point_right:[官方文档](https://router.vuejs.org/zh/)
- routers:
  - `/` 首页
  - `/edit/*`个人信息填写页
  - `/transcript`学生成绩单预览页
  - `/admin/*`PC管理端页面

### 组件库
本项目使用两个组件库：[Vant](https://youzan.github.io/vant/#/zh-CN/intro) / [ElementUI](https://element.faas.ele.me/#/zh-CN/component/installation)
`Vant`负责移动端组件，`ElementUI`负责PC端组件

### 封装组件
- 已封装好的组件放在`/src/components`目录下
  - `/src/components/adminComponents` 数据管理端相关组件
  - `/src/components/collapse` 主页折叠面板相关组件
  - `/src/components/forms` 个人数据填写表单组件
  - `/src/components/popup` 其他数据填写弹出框相关组件
  - `/src/components/admin.vue` adminComponents的父组件
  - `/src/components/formPage.vue` forms的父组件 
  - `/src/components/iframe.vue` 成绩单预览父组件
  - `/src/components/personalInfomation.vue` 系统主页，popup和collapse的父组件

