'use strict';

const Controller = require('egg').Controller;

class TechnologyController extends Controller {
  sortArr(arr) {
    arr.sort((a,b) => {
      return a.year - b.year;
    })
    for (let i = 1; i < arr.length; i++) {
      if (!arr[1]) {
        break;
      }
      if (arr[i].year === arr[i-1].year) {
        if (arr[i].term === '春季学期' && arr[i-1].term === '夏季学期'||arr[i].term === '夏季学期' && arr[i-1].term === '秋季学期'||arr[i].term === '春季学期' && arr[i-1].term === '秋季学期') {
          let a = arr[i];
          arr[i] = arr[i-1];
          arr[i-1] = a;
        }
      }
    }
    return arr;
  }
  async getAllTechnologys() {
    const { openId } = this.ctx.request.body;
    const { Technology } = this.ctx.model;
    const res = await Technology.findOne({ openId });
    if (res !== null) {
      res.technologys = this.sortArr(res.technologys);
      
    }
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
      findRes[0].status = '待审核';
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
