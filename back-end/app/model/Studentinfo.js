'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const StudentInfoSchema = new mongoose.Schema({
    openId: { type: String },
    status: { type: String },
    basicInfo: {
      name: { type: String },
      gender: { type: String },
      stuId: { type: String },
      major: { type: String },
      className: { type: String },
      phoneNumber: { type: String },
      wx: { type: String },
      birthday: { type: String },
      // minority: { type: String },
      volk: { type: String },
      nativePlace: { type: String },
      // dormId: { type: String },
      // enrolment: { type: String },
      // NDstudent: { type: String },
      partyMember: { type: String },
    },
    // personalInfo: {
    //   phoneNumber: { type: String },
    //   // EMail: { type: String },
    //   // QQ: { type: String },
    //   wx: { type: String },
    //   // familyAddress: { type: String },
    // },
  });
  return mongoose.model('Studentinfo', StudentInfoSchema);
};
