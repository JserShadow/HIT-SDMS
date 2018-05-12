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
    const { openId, scholarships } = this.ctx.request.body;
    const { Scholarship } = this.ctx.model;
    const res = await Scholarship.update({ openId }, { scholarships });
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      };
    }
  }
}

module.exports = ScholarshipController;
