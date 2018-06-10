'use strict';

module.exports = app => {
  const { mongoose } = app;
  const RemarkSchema = new mongoose.Schema({
    openId: { type: String },
    status: { type: String },
    remarks: { type: Array },
  });
  return mongoose.model('Remark', RemarkSchema);
};
