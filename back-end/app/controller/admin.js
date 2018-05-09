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
}

module.exports = AdminController;
