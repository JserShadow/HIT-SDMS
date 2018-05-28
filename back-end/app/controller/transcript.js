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
    data.basicInfo = stuInfo.basicInfo;
    data.personalInfo = stuInfo.personalInfo;
    data.scoreInfo = score;
    data.scholarships = scholarship.scholarships;
    data.secondClass = [...secondClass.decrease, ...secondClass.honor, ...secondClass.dorm, ...secondClass.activities, ...secondClass.position];
    data.technologys = technology.technologys;
    data.certificates = certificate.certificates;
    data.socialPractices = socialPractice.socialPractices;
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
    data.basicInfo.partyMember = data.basicInfo.partyMember === '' ? '' : data.basicInfo.partyMember === '是' ? '中共党员': '共青团员';
    data.basicInfo.birthday = data.basicInfo.birthday.replace(/\-/g, '/');
    await this.ctx.render('transcript', data);
  }
}
module.exports = TranscriptController;
