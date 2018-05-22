'use strict';
const { Controller } = require('egg');

class CertificateController extends Controller {
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
  async getAllCertificates() {
    const { openId } = this.ctx.request.body;
    const { Certificate } = this.ctx.model;
    const res = await Certificate.findOne({ openId });
    res.certificates = this.sortArr(res.certificates);
    console.log(res);
    this.ctx.body = {
      message: 'ok',
      certificate: res,
    };
  }
  async updateCertificates() {
    const { openId, certificate } = this.ctx.request.body;
    const { Certificate } = this.ctx.model;
    const findRes = await Certificate.find({ openId });
    if (findRes.length) {
      findRes[0].certificates.push(certificate);
      findRes[0].status = '待审核';
      const res = await Certificate.update({ openId }, findRes[0]);
      if (res.ok === 1) {
        this.ctx.body = {
          message: 'ok'
        };
      }
    } else {
      let certificates = [ certificate ];
      const data = {
        status: '待审核',
        openId,
        certificates
      };
      const certificateData = new Certificate(data);
      await certificateData.save();
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
  async removeCertificates() {
    const { openId, certificates } = this.ctx.request.body;
    const { Certificate } = this.ctx.model;
    const res = await Certificate.update({ openId }, certificates);
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
}

module.exports = CertificateController;
