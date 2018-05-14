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
  // 职位相关
  router.get('/position/getAllPositions', controller.positions.getAllPositions);
  router.post('/position/getAllSecondclassInfo', controller.positions.getAllSecondclassInfo);
  router.post('/position/submitSecondclass', controller.positions.submitSecondclass);
  // 奖学金相关
  router.post('/scholarship/getAllScholarships', controller.scholarship.getAllScholarships);
  router.post('/scholarship/updateScholarships', controller.scholarship.updateScholarships);
  router.post('/scholarship/removeScholarships', controller.scholarship.removeScholarships);
  // 科技创新相关
  router.post('/technology/getAllTechnologys', controller.technology.getAllTechnologys);
  router.post('/technology/updateTechnologys', controller.technology.updateTechnologys);
  router.post('/technology/removeTechnologys', controller.technology.removeTechnologys);
  // 其他证书相关
  router.post('/certificate/getAllCertificates', controller.certificate.getAllCertificates);
  router.post('/certificate/updateCertificates', controller.certificate.updateCertificates);
  router.post('/certificate/removeCertificates', controller.certificate.removeCertificates);
  // 社会实践相关
  router.post('/socialPractice/getAllSocialPractices', controller.socialPractice.getAllSocialPractices);
  router.post('/socialPractice/updateSocialPractices', controller.socialPractice.updateSocialPractices);
  router.post('/socialPractice/removeSocialPractices', controller.socialPractice.removeSocialPractices);
  // 管理相关
  router.get('/admin/info/getAllInfos', controller.admin.getAllInfos);
  router.post('/admin/info/pass', controller.admin.pass);
  router.post('/admin/info/fail', controller.admin.fail);
  router.get('/admin/score/getAllScores', controller.admin.getAllScores);
  router.post('/admin/score/pass', controller.admin.scorePass);
  router.post('/admin/score/fail', controller.admin.scoreFail);
  router.get('/admin/secondclass/getAllSecondClassInfos', controller.admin.getAllSecondClassInfos);
  router.post('/admin/secondclass/pass', controller.admin.secondclassPass);
  router.post('/admin/secondclass/fail', controller.admin.secondclassFail);
  router.post('/admin/scholarship/addScholarship', controller.admin.addScholarship);
  router.post('/admin/scholarship/removeScholarship', controller.admin.removeScholarship);
  router.get('/admin/scholarship/getAllScholarships', controller.admin.getAllScholarships);
  router.get('/admin/scholarship/getAllStudentScholarships', controller.admin.getAllStudentScholarships);
  router.post('/admin/scholarship/pass', controller.admin.scholarshipPass);
  router.post('/admin/scholarship/fail', controller.admin.scholarshipFail);
  router.get('/admin/technology/getAllTechnologys', controller.admin.getAllTechnologys);
  router.post('/admin/technology/pass', controller.admin.technologyPass);
  router.post('/admin/technology/fail', controller.admin.technologyFail);
  router.post('/admin/certificate/addCertificate', controller.admin.addCertificate);
  router.post('/admin/certificate/removeCertificate', controller.admin.removeCertificate);
  router.get('/admin/certificate/getAllCertificates', controller.admin.getAllCertificates);
};
