'use strict';

const { Controller } = require('egg');

class SocialPracticeController extends Controller {
  async getAllSocialPractices() {
    const { openId } = this.ctx.request.body;
    const { Socialpractice } = this.ctx.model;
    const res = await Socialpractice.findOne({ openId });
    this.ctx.body = {
      message: 'ok',
      socialPractice: res,
    };
  }
  async updateSocialPractices() {
    const { openId, socialPractice } = this.ctx.request.body;
    console.log(socialPractice);
    const { Socialpractice } = this.ctx.model;
    const findRes = await Socialpractice.find({ openId });
    if (findRes.length) {
      findRes[0].socialPractices.push(socialPractice);
      const res = await Socialpractice.update({ openId }, findRes[0]);
      if (res.ok === 1) {
        this.ctx.body = {
          message: 'ok'
        };
      }
    } else {
      let socialPractices = [ socialPractice ];
      const data = {
        status: '待审核',
        openId,
        socialPractices
      };
      const socialPracticeData = new Socialpractice(data);
      await socialPracticeData.save();
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
  async removeSocialPractices() {
    const { openId,socialPractices } = this.ctx.request.body;
    const { Socialpractice } = this.ctx.model;
    const res = await Socialpractice.update({ openId }, socialPractices);
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
}

module.exports = SocialPracticeController;
