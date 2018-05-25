'use strict';

const { Controller } = require('egg');

class SocialPracticeController extends Controller {
  async getAllSocialPractices() {
    const { openId } = this.ctx.request.body;
    const { Socialpractice } = this.ctx.model;
    const res = await Socialpractice.findOne({ openId });
    if (res !== null) {
      res.socialPractices.sort((a,b) => {
        return a.year - b.year;
      });
      for (let i = 1; i < res.socialPractices.length; i++) {
        if (!res.socialPractices[1]) {
          break;
        }
        if (res.socialPractices[i].year === res.socialPractices[i-1].year) {
          if (res.socialPractices[i].term === '春季学期' && res.socialPractices[i-1].term === '夏季学期'||res.socialPractices[i].term === '春季学期' && res.socialPractices[i-1].term === '秋季学期'||res.socialPractices[i].term === '夏季学期' && res.socialPractices[i-1].term === '秋季学期') {
            let a = res.socialPractices[i];
            res.socialPractices[i] = res.socialPractices[i-1];
            res.socialPractices[i-1] = a;
          }
        }
      }
    }
    this.ctx.body = {
      message: 'ok',
      socialPractice: res,
    };
  }
  async updateSocialPractices() {
    const { openId, socialPractice } = this.ctx.request.body;
    const { Socialpractice } = this.ctx.model;
    const findRes = await Socialpractice.find({ openId });
    if (findRes.length) {
      findRes[0].socialPractices.push(socialPractice);
      findRes[0].status = '待审核';
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
