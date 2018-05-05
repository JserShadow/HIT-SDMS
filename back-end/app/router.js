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
  // 成绩相关
  router.post('/score/addScore', controller.score.addScore);
  router.post('/score/updateScore', controller.score.updateScore);
  router.post('/score/deleteScore', controller.score.deleteScore);
  router.post('/score/getAllScores', controller.score.getAllScores);
  // 管理相关
  router.post('/admin/info/getAllInfos', controller.admin.getAllInfos);
};
