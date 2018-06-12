# HIT-SDMS
> 哈工大航天学院成长全记录系统(微信小程序)

### 目录结构
- `back-end`为应用服务器，用Egg.js编写 :point_right: [官方文档](https://eggjs.org/zh-cn/tutorials/index.html)
- `front-end`为系统前端页面，用Vue.js编写  :point_right: [官方文档](https://cn.vuejs.org/index.html)
- `mina`为小程序架构，用mpVue编写  :point_right: [官方文档](http://mpvue.com/mpvue/quickstart/)

### 为什么写小程序还会另有前端？
考虑到该项目需要相对快速开发且后期需要移植到PC端的可能性，该项目使用小程序的`web-view`组件引入网站的方式进行开发，小程序只作容器和用户登录的工具使用。

### 开始
- [服务器部分](https://github.com/JserShadow/HIT-SDMS/blob/master/back-end/README.md) :rocket:
- [前端部分](https://github.com/JserShadow/HIT-SDMS/blob/master/front-end/README.md) :computer:
- [小程序部分](https://github.com/JserShadow/HIT-SDMS/blob/master/mina/README.md) :calling:

### 发布日志 :book:
- v 0.0.0.1
  - 搭建开发环境
  - 完成小程序登录
  - 完成个人信息填写功能
- v 0.0.0.2
  - 增加成绩、第二课堂模块
  - 减少个人信息填写
  - 搭建数据管理端(提供信息填写审核功能)
- v 0.0.0.3
  - 添加剩余四个表单模块
  - 修复已知Bug
  - 修改部分数据结构
- v 0.0.0.4
  - 修改小程序登录逻辑
  - 添加生成学生成绩单功能
  - 减少个人信息填写数量
  - 调整部分表单内容
- v 0.0.0.5
  - 提供成绩单手机端预览功能
  - 修复浏览器缓存问题

### :warning: 目前已知问题
- 一段时间后小程序登录时解密程序会出错导致无法正常跳转到`web-view`页面
  - 定位问题： 可能是小程序`session_key`的问题，正在尝试修复
  - 临时解决办法：把小程序删掉重新进入即可正常登录

----------------------------
<font color="#cccccc"><center>Authored by Jser@JserShadow</center></font>

