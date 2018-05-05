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
    const { Studentinfos } = this.ctx.model;
    const Ids = await this.getOpenIds();
    const waitingResult = [];
    const successResult = [];
    const failedResult = [];
    try {
      for (const Id of Ids) {
        const waitingRes = await Studentinfos.find({ openId: Id, status: '待审核' });
        const successRes = await Studentinfos.find({ openId: Id, status: '审核通过' });
        const failedRes = await Studentinfos.find({ openId: Id, status: '审核未通过' });
        waitingResult.push(waitingRes);
        successResult.push(successRes);
        failedResult.push(failedRes);
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
}

module.exports = AdminController;
