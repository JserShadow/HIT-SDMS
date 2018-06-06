'use strict';

const { Controller } = require('egg');
class TranscriptController extends Controller {
  async getPage() {
    const { userID } = this.ctx.query;
    const { Studentinfo, Score, Secondclass, Scholarship, Technology, Certificate, Socialpractice } = this.ctx.model;
    const stuInfo = await Studentinfo.findOne({ openId: userID });
    const score = await Score.find({ openId: userID });
    const scholarship = await Scholarship.findOne({ openId: userID });
    const secondClass = await Secondclass.findOne({ openId: userID });
    const technology = await Technology.findOne({ openId: userID });
    const certificate = await Certificate.findOne({ openId: userID });
    const socialPractice = await Socialpractice.findOne({ openId: userID });
    let data = {};
    if (stuInfo) {
      data.basicInfo = stuInfo.basicInfo;
    }
    data.scoreInfo = score;
    data.scholarships = scholarship.scholarships;
    data.secondClass = [...secondClass.position, ...secondClass.honor, ...secondClass.activities,...secondClass.dorm,  ...secondClass.decrease];
    data.technologys = technology.technologys;
    data.certificates = certificate.certificates;
    data.socialPractices = socialPractice.socialPractices;
    let allScore = 0;
    for (const item of score) {
      allScore+=parseFloat(item.score);
    }
    data.mainScore = (allScore / score.length).toFixed(4);
    for (const key in data) {
      if (key === 'technologys' || key === 'certificates') {
        for (const j of data[key]) {
          j.name = j.name.replace(/\//g, ', ');
        }
      }else if (key === 'secondClass') {
        for (const i of data[key]) {
          i.name = i.name.split('/');
        }
      }
    }
    await this.ctx.render('transcript', data);
  }
}
module.exports = TranscriptController;
