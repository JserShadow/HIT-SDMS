'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 登陆相关
  router.get('/login', controller.login.login);
  router.post('/login/getUserInfo', controller.login.getUserInfo);
  // 上传信息
  router.post('/submit/studentInfo', controller.submit.studentInfo);
  // 获取信息
  router.post('/info/studentInfo', controller.info.studentInfo);
};
