'use strict';

module.exports = app => {
  const { mongoose } = app;
  const ScoreSchema = new mongoose.Schema({
    openId: { type: String },
    score: { type: String },
    gradeName: {
      year: { type: String },
      term: { type: String },
    },
    hasPass: { type: Boolean },
    failingCourse: { type: Array },
    failedCourse: { type: Array },
  });
  return mongoose.model('Score', ScoreSchema);
};

