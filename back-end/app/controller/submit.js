'use strict';

const Controller = require('egg').Controller;

class SubmitController extends Controller {
  async studentInfo() {
    const { Studentinfo } = this.ctx.model;
    const newStudentInfo = this.ctx.request.body;
    try {
      const findRes = await Studentinfo.find({ openId: newStudentInfo.openId });
      if (findRes.length === 0) {
        const newData = new Studentinfo(newStudentInfo);
        newData.save();
      } else {
        await Studentinfo.update({ openId: newStudentInfo.openId }, newStudentInfo);
      }
    } catch (error) {
      this.ctx.body = new Error('数据库繁忙，请重试');
    }
    this.ctx.body = 'success';
  }
}

module.exports = SubmitController;
