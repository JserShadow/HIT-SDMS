'use strict';

const { Controller } = require('egg');

class ScholarshipController extends Controller {
  async getAllScholarships() {
    const { openId } = this.ctx.request.body;
    const { Scholarship } = this.ctx.model;
    const res = await Scholarship.find({ openId });
    this.ctx.body = {
      message: 'ok',
      scholarships: res
    };
  };
  async updateScholarships() {
    const { openId, scholarship } = this.ctx.request.body;
    const { Scholarship } = this.ctx.model;
    const findRes = await Scholarship.find({ openId });
    if (findRes.length) {
      findRes[0].scholarships.push(scholarship);
      const res = await Scholarship.update({ openId }, findRes[0]);
      if (res.ok === 1) {
        this.ctx.body = {
          message: 'ok'
        };
      }
    } else {
      let scholarships = [ scholarship ];
      const data = {
        status: '待审核',
        openId,
        scholarships
      };
      const scholarshipData = new Scholarship(data);
      await scholarshipData.save();
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
  async removeScholarships() {
    const { openId, scholarships } = this.ctx.request.body;
    const { Scholarship } = this.ctx.model;
    const res = await Scholarship.update({ openId }, scholarships);
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
}

module.exports = ScholarshipController;
