'use strict';

const { Controller } = require('egg');

class ScholarshipController extends Controller {
  async getAllScholarships() {
    const { openId } = this.ctx.request.body;
    const { Scholarship } = this.ctx.model;
    const res = await Scholarship.find({ openId });
    res[0].scholarships.sort((a,b) => {
      return a.year - b.year;
    })
    for (let i = 1; i < res[0].scholarships.length; i++) {
      if (!res[0].scholarships[1]) {
        break;
      }
      if (res[0].scholarships[i].year === res[0].scholarships[i-1].year) {
        if (res[0].scholarships[i].term === '春季学期' && res[0].scholarships[i-1].term === '夏季学期'||res[0].scholarships[i].term === '春季学期' && res[0].scholarships[i-1].term === '秋季学期' || res[0].scholarships[i].term === '夏季学期' && res[0].scholarships[i-1].term === '秋季学期') {
          let a = res[0].scholarships[i];
          res[0].scholarships[i] = res[0].scholarships[i-1];
          res[0].scholarships[i-1] = a;
        }
      }
    }
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
      findRes[0].status = '待审核';
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
