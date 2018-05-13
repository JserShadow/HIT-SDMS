'use strict';

const Controller = require('egg').Controller;

class TechnologyController extends Controller {
  async getAllTechnologys() {
    const { openId } = this.ctx.request.body;
    const { Technology } = this.ctx.model;
    const res = await Technology.findOne({ openId });
    this.ctx.body = {
      message: 'ok',
      technology: res,
    };
  }
  async updateTechnologys() {
    const { openId, technology } = this.ctx.request.body;
    const { Technology } = this.ctx.model;
    const findRes = await Technology.find({ openId });
    if (findRes.length) {
      findRes[0].technologys.push(technology);
      const res = await Technology.update({ openId }, findRes[0]);
      if (res.ok === 1) {
        this.ctx.body = {
          message: 'ok'
        };
      }
    } else {
      let technologys = [ technology ];
      const data = {
        status: '待审核',
        openId,
        technologys
      };
      const technologyData = new Technology(data);
      await technologyData.save();
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
  async removeTechnologys() {
    const { openId, technologys } = this.ctx.request.body;
    const { Technology } = this.ctx.model;
    const res = await Technology.update({ openId }, technologys);
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
}

module.exports = TechnologyController;
