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
}

module.exports = AdminController;
