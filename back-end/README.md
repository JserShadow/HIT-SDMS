# HIT-SDMS

>HIT Students' Documents Management System

[TOC]

## 快速入门

<!-- 在此次添加使用文档 -->
### 后台渲染
- 学生成绩单使用`Nunjucks`引擎渲染，配合`egg-view-nunjucks`使用:point_down:
[Nunjucks 文档](http://mozilla.github.io/nunjucks/)  [egg--view-nunjucks 文档](https://www.npmjs.com/package/egg-view-nunjucks)
### 数据库
- 该项目使用`MongoDB`存放数据，配合`egg-mongoose`插件使用
### Routers
- /login/* 小程序登录相关接口
  - /login 小程序登录流程
  - /login/getUserInfo 获取用户信息
- /submit/* 上传个人信息接口
- /info/* 获取个人信息接口
- /score/* 分数相关接口
- /position/* 第二课堂相关接口
- /scholarship/* 奖学金相关接口
- /technology/* 科技创新相关接口
- /certificate/* 其他证书相关接口
- /remark/* 备注相关接口
- /admin/* 数据管理端相关接口
- /transcript 后台渲染学生成绩单输出接口

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org
