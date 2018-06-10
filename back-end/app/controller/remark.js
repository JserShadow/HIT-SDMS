'use strict';

const Controller = require('egg').Controller;

class RemarkController extends Controller {
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
  async getAllRemarks() {
    const { openId } = this.ctx.request.body;
    const { Remark } = this.ctx.model;
    const res = await Remark.findOne({ openId });
    if (res !== null) {
      res.remarks = this.sortArr(res.remarks);
    }
    this.ctx.body = {
      message: 'ok',
      remarks: res,
    };
  }
  async updateRemarks() {
    const { openId, remark } = this.ctx.request.body;
    const { Remark } = this.ctx.model;
    const findRes = await Remark.find({ openId });
    if (findRes.length) {
      findRes[0].remarks.push(remark);
      findRes[0].status = '待审核';
      const res = await Remark.update({ openId }, findRes[0]);
      if (res.ok === 1) {
        this.ctx.body = {
          message: 'ok'
        };
      }
    } else {
      const remarks = [ remark ];
      const data = {
        status: '待审核',
        openId,
        remarks,
      };
      const remarkData = new Remark(data);
      await remarkData.save();
      this.ctx.body = {
        message: 'ok',
      }
    }
  }
  async removeRemarks() {
    const { openId, remarks } = this.ctx.request.body;
    const { Remark } = this.ctx.model;
    const res = await Remark.update({ openId }, remarks);
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
}

module.exports = RemarkController;
