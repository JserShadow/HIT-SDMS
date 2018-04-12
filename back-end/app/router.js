'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
 
  router.get('/login', controller.login.login);
  router.post('/login/getUserInfo', controller.login.getUserInfo);

  router.post('/submit/studentInfo', controller.submit.studentInfo);
};
