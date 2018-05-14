'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const SocialPracticeSchema = new mongoose.Schema({
    openId: { type: String },
    status: { type: String },
    socialPractices: { type: Array }
  });
  return mongoose.model('Socialpractice', SocialPracticeSchema);
}
