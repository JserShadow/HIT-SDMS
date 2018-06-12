'use strict';

const { Controller } = require('egg');

class AdminController extends Controller {
  async getOpenIds() {
    const { Users } = this.ctx.model;
    const res = await Users.find();
    const arr = [];
    for (const user of res) {
      arr.push(user.openId);
    }
    return arr;
  }
  async getAllInfos() {
    const { Studentinfo } = this.ctx.model;
    const Ids = await this.getOpenIds();
    let waitingResult = [];
    let successResult = [];
    let failedResult = [];
    try {
      for (const Id of Ids) {
        const waitingRes = await Studentinfo.find({ openId: Id, status: '待审核' });
        const successRes = await Studentinfo.find({ openId: Id, status: '审核通过' });
        const failedRes = await Studentinfo.find({ openId: Id, status: '审核未通过' });
        waitingResult = waitingRes;
        successResult = successRes;
        failedResult = failedRes;
      }
      this.ctx.body = {
        message: 'ok',
        waiting: waitingResult,
        success: successResult,
        failed: failedResult,
      };
    } catch (error) {
      console.log(error);
      this.ctx.body = {
        message: 'error',
      };
    }
  }
  async pass() {
    const { id } = this.ctx.request.body;
    const { Studentinfo } = this.ctx.model;
    const res = await Studentinfo.update({ _id: id }, { $set: { status: '审核通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok',
      };
    }
  }
  async fail() {
    const { id } = this.ctx.request.body;
    const { Studentinfo } = this.ctx.model;
    const res = await Studentinfo.update({ _id: id }, { $set: { status: '审核未通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok',
      };
    }
  }
  async getAllScores() {
    const { Score, Studentinfo } = this.ctx.model;
    const Ids = await this.getOpenIds();
    let waitingArr = [];
    let passArr = [];
    let failArr = [];
    try {
      for (const Id of Ids) {
        const waitingObj = {};
        const passObj = {};
        const failObj = {};
        const thisStudent = await Studentinfo.find({ openId: Id });
        waitingObj.name = thisStudent[0].basicInfo.name;
        passObj.name = thisStudent[0].basicInfo.name;
        failObj.name = thisStudent[0].basicInfo.name;
        waitingObj.stuId = thisStudent[0].basicInfo.stuId;
        passObj.stuId = thisStudent[0].basicInfo.stuId;
        failObj.stuId = thisStudent[0].basicInfo.stuId;
        waitingObj.res = await Score.find({ openId: Id, status: '待审核' });
        passObj.res = await Score.find({ openId: Id, status: '审核通过' });
        failObj.res = await Score.find({ openId: Id, status: '审核未通过' });
        waitingArr.push(waitingObj);
        passArr.push(passObj);
        failArr.push(failObj);
        if (!waitingObj.res.length) {
          waitingArr = [];
        }
        if (!passObj.res.length) {
          passArr = [];
        }
        if (!failObj.res.length) {
          failArr = [];
        }
      }
      this.ctx.body = {
        message: 'ok',
        resData: {
          waiting: waitingArr,
          pass: passArr,
          fail: failArr,
        },
      };
    } catch (error) {
      console.log(error);
      this.ctx.body = {
        message: 'error',
      };
    }
  }
  async scorePass() {
    const { row } = this.ctx.request.body;
    const { Score } = this.ctx.model;
    for (const item of row.res) {
      await Score.update({ _id: item._id }, { $set: { status: '审核通过' } });
    }
    this.ctx.body = {
      message: 'ok',
    };
  }
  async scoreFail() {
    const { row } = this.ctx.request.body;
    const { Score } = this.ctx.model;
    for (const item of row.res) {
      await Score.update({ _id: item._id }, { $set: { status: '审核未通过' } });
    }
    this.ctx.body = {
      message: 'ok',
    };
  }
  async getAllSecondClassInfos() {
    const Ids = await this.getOpenIds();
    const { Secondclass, Studentinfo } = this.ctx.model;
    let waitingarr = [];
    let successarr = [];
    let failarr = [];
    for (const id of Ids) {
      const infores = await Studentinfo.find({ openId: id });
      const waiting = {};
      const success = {};
      const fail = {};
      let waitingres = await Secondclass.findOne({ openId: id, status: '待审核' });
      let successres = await Secondclass.findOne({ openId: id, status: '审核通过' });
      let failres = await Secondclass.findOne({ openId: id, status: '审核未通过' });
      Object.assign(waiting, waitingres);
      Object.assign(success, successres);
      Object.assign(fail, failres);
      waiting.name = infores[0].basicInfo.name;
      waiting.stuId = infores[0].basicInfo.stuId;
      success.name = infores[0].basicInfo.name;
      success.stuId = infores[0].basicInfo.stuId;
      fail.name = infores[0].basicInfo.name;
      fail.stuId = infores[0].basicInfo.stuId;
      if (waitingres !== null) {
        waitingarr.push(waiting);
      }
      if (successres !== null) {
        successarr.push(success);
      }
      if (failres !== null) {
        failarr.push(fail);
      }
    }
    this.ctx.body = {
      message: 'ok',
      waiting: waitingarr,
      success: successarr,
      fail: failarr,
    }
  }
  async secondclassPass() {
    const { row } = this.ctx.request.body;
    const { Secondclass } = this.ctx.model;
    const res = await Secondclass.update({ _id: row._id }, { $set: { status: '审核通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
  async secondclassFail() {
    const { row } = this.ctx.request.body;
    const { Secondclass } = this.ctx.model;
    const res = await Secondclass.update({ _id: row._id }, { $set: { status: '审核未通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
  async getAllScholarships() {
    const { Adminscholarship } = this.ctx.model;
    const res = await Adminscholarship.find({});
    this.ctx.body = {
      message: 'ok',
      scholarships: res
    }
  }
  async addScholarship() {
    const { scholarshipName } = this.ctx.request.body;
    const doc = {
      name: scholarshipName
    }
    const { Adminscholarship } = this.ctx.model;
    const res = await Adminscholarship.find({ name: scholarshipName });
    if (res.length !== 0) {
      this.ctx.body = {
        message: 'fail',
        resMessage: '该奖学金已经存在'
      }
      return;
    }
    const newscholarship = new Adminscholarship(doc);
    await newscholarship.save();
    this.ctx.body = {
      message: 'ok',
    }
  }
  async removeScholarship() {
    const { id } = this.ctx.request.body;
    const { Adminscholarship } = this.ctx.model;
    const res = await Adminscholarship.remove({ _id: id });
    this.ctx.body = {
      message: 'ok'
    }
  }
  async getAllStudentScholarships() {
    const Ids = await this.getOpenIds();
    const { Scholarship, Studentinfo } = this.ctx.model;
    let waitingArr = [];
    let successArr = [];
    let failArr = [];
    for (const id of Ids) {
      let waitingObj = {};
      let successObj = {};
      let failObj = {};
      const infores = await Studentinfo.findOne({ openId: id });
      const waiting = await Scholarship.findOne({ openId: id, status: '待审核' });
      const success = await Scholarship.findOne({ openId: id, status: '审核通过' });
      const fail = await Scholarship.findOne({ openId: id, status: '审核未通过' });
      if (waiting) {
        Object.assign(waitingObj, waiting._doc);
        waitingObj.name = infores.basicInfo.name;
        waitingObj.stuId = infores.basicInfo.stuId;
        waitingArr.push(waitingObj);
      }
      if (success) {
        Object.assign(successObj, success._doc);
        successObj.name = infores.basicInfo.name;
        successObj.stuId = infores.basicInfo.stuId;
        successArr.push(successObj);
      }
      if (fail) {
        Object.assign(failObj, fail._doc);
        failObj.name = infores.basicInfo.name;
        failObj.stuId = infores.basicInfo.stuId;
        failArr.push(failObj);
      }
    }
    this.ctx.body = {
      message: 'ok',
      studentScholarships: {
        waiting: waitingArr,
        success: successArr,
        fail: failArr
      }
    }
  }
  async scholarshipPass() {
    const { id } = this.ctx.request.body;
    const { Scholarship } = this.ctx.model;
    const res = await Scholarship.update({ _id: id }, { $set: { status: '审核通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      };
    }
  }
  async scholarshipFail() {
    const { id } = this.ctx.request.body;
    const { Scholarship } = this.ctx.model;
    const res = await Scholarship.update({ _id: id }, { $set: { status: '审核未通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      };
    }
  }
  async getAllTechnologys() {
    const Ids = await this.getOpenIds();
    const { Technology, Studentinfo } = this.ctx.model;
    let waitingArr = [];
    let successArr = [];
    let failArr = [];
    for (const id of Ids) {
      let waitingObj = {};
      let successObj = {};
      let failObj = {};
      const infores = await Studentinfo.findOne({ openId: id });
      const waiting = await Technology.findOne({ openId: id, status: '待审核' });
      const success = await Technology.findOne({ openId: id, status: '审核通过' });
      const fail = await Technology.findOne({ openId: id, status: '审核未通过' });
      if (waiting) {
        Object.assign(waitingObj, waiting._doc);
        waitingObj.name = infores.basicInfo.name;
        waitingObj.stuId = infores.basicInfo.stuId;
        waitingArr.push(waitingObj);
      }
      if (success) {
        Object.assign(successObj, success._doc);
        successObj.name = infores.basicInfo.name;
        successObj.stuId = infores.basicInfo.stuId;
        successArr.push(successObj);
      }
      if (fail) {
        Object.assign(failObj, fail._doc);
        failObj.name = infores.basicInfo.name;
        failObj.stuId = infores.basicInfo.stuId;
        failArr.push(failObj);
      }
    }
    console.log(waitingArr.length);
    this.ctx.body = {
      message: 'ok',
      technologys: {
        waiting: waitingArr,
        success: successArr,
        fail: failArr
      }
    }
  }
  async technologyPass() {
    const { id } = this.ctx.request.body;
    const { Technology } = this.ctx.model;
    const res = await Technology.update({ _id: id }, { $set: { status: '审核通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      };
    }
  }
  async technologyFail() {
    const { id } = this.ctx.request.body;
    const { Technology } = this.ctx.model;
    const res = await Technology.update({ _id: id }, { $set: { status: '审核未通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      };
    }
  }
  async getAllCertificates() {
    const { Admincertificate } = this.ctx.model;
    const res = await Admincertificate.find({});
    this.ctx.body = {
      message: 'ok',
      certificates: res
    }
  }
  async addCertificate() {
    const { certificateName } = this.ctx.request.body;
    const doc = {
      name: certificateName
    }
    const { Admincertificate } = this.ctx.model;
    const res = await Admincertificate.find({ name: certificateName });
    if (res.length !== 0) {
      this.ctx.body = {
        message: 'fail',
        resMessage: '该证书已经存在'
      }
      return;
    }
    const newscholarship = new Admincertificate(doc);
    await newscholarship.save();
    this.ctx.body = {
      message: 'ok',
    }
  }
  async removeCertificate() {
    const { id } = this.ctx.request.body;
    const { Admincertificate } = this.ctx.model;
    const res = await Admincertificate.remove({ _id: id });
    this.ctx.body = {
      message: 'ok'
    }
  }
  async getAllStudentCertificates() {
    const Ids = await this.getOpenIds();
    const { Certificate, Studentinfo } = this.ctx.model;
    let waitingArr = [];
    let successArr = [];
    let failArr = [];
    for (const id of Ids) {
      let waitingObj = {};
      let successObj = {};
      let failObj = {};
      const infores = await Studentinfo.findOne({ openId: id });
      const waiting = await Certificate.findOne({ openId: id, status: '待审核' });
      const success = await Certificate.findOne({ openId: id, status: '审核通过' });
      const fail = await Certificate.findOne({ openId: id, status: '审核未通过' });
      if (waiting) {
        Object.assign(waitingObj, waiting._doc);
        waitingObj.name = infores.basicInfo.name;
        waitingObj.stuId = infores.basicInfo.stuId;
        waitingArr.push(waitingObj);
      }
      if (success) {
        Object.assign(successObj, success._doc);
        successObj.name = infores.basicInfo.name;
        successObj.stuId = infores.basicInfo.stuId;
        successArr.push(successObj);
      }
      if (fail) {
        Object.assign(failObj, fail._doc);
        failObj.name = infores.basicInfo.name;
        failObj.stuId = infores.basicInfo.stuId;
        failArr.push(failObj);
      }
    }
    console.log(waitingArr.length);
    this.ctx.body = {
      message: 'ok',
      certificates: {
        waiting: waitingArr,
        success: successArr,
        fail: failArr
      }
    }
  }
  async certificatePass() {
    const { id } = this.ctx.request.body;
    const { Certificate } = this.ctx.model;
    const res = await Certificate.update({ _id: id }, { $set: { status: '审核通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      };
    }
  }
  async certificateFail() {
    const { id } = this.ctx.request.body;
    const { Certificate } = this.ctx.model;
    const res = await Certificate.update({ _id: id }, { $set: { status: '审核未通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      };
    }
  }
  async getAllSocialPractices() {
    const Ids = await this.getOpenIds();
    const { Socialpractice, Studentinfo } = this.ctx.model;
    let waitingArr = [];
    let successArr = [];
    let failArr = [];
    for (const id of Ids) {
      let waitingObj = {};
      let successObj = {};
      let failObj = {};
      const infores = await Studentinfo.findOne({ openId: id });
      const waiting = await Socialpractice.findOne({ openId: id, status: '待审核' });
      const success = await Socialpractice.findOne({ openId: id, status: '审核通过' });
      const fail = await Socialpractice.findOne({ openId: id, status: '审核未通过' });
      if (waiting) {
        Object.assign(waitingObj, waiting._doc);
        waitingObj.name = infores.basicInfo.name;
        waitingObj.stuId = infores.basicInfo.stuId;
        waitingArr.push(waitingObj);
      }
      if (success) {
        Object.assign(successObj, success._doc);
        successObj.name = infores.basicInfo.name;
        successObj.stuId = infores.basicInfo.stuId;
        successArr.push(successObj);
      }
      if (fail) {
        Object.assign(failObj, fail._doc);
        failObj.name = infores.basicInfo.name;
        failObj.stuId = infores.basicInfo.stuId;
        failArr.push(failObj);
      }
    }
    console.log(waitingArr.length);
    this.ctx.body = {
      message: 'ok',
      socialPractices: {
        waiting: waitingArr,
        success: successArr,
        fail: failArr
      }
    }
  }
  async socialPracticePass() {
    const { id } = this.ctx.request.body;
    const { Socialpractice } = this.ctx.model;
    const res = await Socialpractice.update({ _id: id }, { $set: { status: '审核通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      };
    }
  }
  async socialPracticeFail() {
    const { id } = this.ctx.request.body;
    const { Socialpractice } = this.ctx.model;
    const res = await Socialpractice.update({ _id: id }, { $set: { status: '审核未通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      };
    }
  }
  async getAllRemarks() {
    const Ids = await this.getOpenIds();
    const { Remark, Studentinfo } = this.ctx.model;
    let waitingArr = [];
    let successArr = [];
    let failArr = [];
    for (const id of Ids) {
      let waitingObj = {};
      let successObj = {};
      let failObj = {};
      const infores = await Studentinfo.findOne({ openId: id });
      const waiting = await Remark.findOne({ openId: id, status: '待审核' });
      const success = await Remark.findOne({ openId: id, status: '审核通过' });
      const fail = await Remark.findOne({ openId: id, status: '审核未通过' });
      if (waiting) {
        Object.assign(waitingObj, waiting._doc);
        waitingObj.name = infores.basicInfo.name;
        waitingObj.stuId = infores.basicInfo.stuId;
        waitingArr.push(waitingObj);
      }
      if (success) {
        Object.assign(successObj, success._doc);
        successObj.name = infores.basicInfo.name;
        successObj.stuId = infores.basicInfo.stuId;
        successArr.push(successObj);
      }
      if (fail) {
        Object.assign(failObj, fail._doc);
        failObj.name = infores.basicInfo.name;
        failObj.stuId = infores.basicInfo.stuId;
        failArr.push(failObj);
      }
    }
    console.log(waitingArr.length);
    this.ctx.body = {
      message: 'ok',
      remarks: {
        waiting: waitingArr,
        success: successArr,
        fail: failArr
      }
    }
  }
  async remarkPass() {
    const { id } = this.ctx.request.body;
    const { Remark } = this.ctx.model;
    const res = await Remark.update({ _id: id }, { $set: { status: '审核通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      };
    }
  }
  async remarkFail() {
    const { id } = this.ctx.request.body;
    const { Remark } = this.ctx.model;
    const res = await Remark.update({ _id: id }, { $set: { status: '审核未通过' } });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      };
    }
  }
}

module.exports = AdminController;
