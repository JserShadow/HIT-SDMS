'use strict';

module.exports = app => {
  const { mongoose } = app;
  const ScholarshipSchema = new mongoose.Schema({
    openId: { type: String },
    status: { type: String },
    scholarships: { type: Array },
  });
  return mongoose.model('Scholarship', ScholarshipSchema);
}
