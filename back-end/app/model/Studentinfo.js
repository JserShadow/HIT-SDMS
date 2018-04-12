'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const StudentInfoSchema = new mongoose.Schema({
    openId: { type: String },
    basicInfo: {
      name: { type: String },
      gender: { type: String },
      stuId: { type: String },
      major: { type: String },
      birthday: { type: String },
      minority: { type: String },
      volk: { type: String },
      nativePlace: { type: String },
      dormId: { type: String },
      enrolment: { type: String },
      NDstudent: { type: String },
      partyMember: { type: String },
    },
    personalInfo: {
      phoneNumber: { type: String },
      EMail: { type: String },
      QQ: { type: String },
      IDCard: { type: String },
      familyAddress: { type: String },
    },
    familyInfo: {
      fatherName: { type: String },
      fatherPhoneNumber: { type: String },
      fatherWorkPlace: { type: String },
      motherName: { type: String },
      motherPhoneNumber: { type: String },
      motherWorkPlace: { type: String },
    },
    graduateInfo: {
      schoolRollStatus: { type: String },
      graduateRoute: { type: String },
      remark: { type: String },
    },
  });
  return mongoose.model('Studentinfo', StudentInfoSchema);
};
