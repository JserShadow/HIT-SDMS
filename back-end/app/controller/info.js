'use strict';

const Controller = require('egg').Controller;

class InfoController extends Controller {
  async studentInfo() {
    const { Studentinfo } = this.ctx.model;
    const { openId } = this.ctx.request.body;
    const mongoRes = await Studentinfo.findOne({ openId });
    if (mongoRes.length === 0) {
      this.ctx.body = {
        success: false,
      };
      return;
    }
    this.ctx.body = {
      success: true,
      studentInfo: mongoRes,
    };
  }
}

module.exports = InfoController;
