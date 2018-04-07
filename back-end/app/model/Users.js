'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    openId: { type: String },
    nickName: { type: String },
    avatarUrl: { type: String },
    gender: { type: Number },
    country: { type: String },
    city: { type: String },
    province: { type: String },
    language: { type: String },
  }, {
    timestamps: true,
  });
  return mongoose.model('Users', UserSchema);
};
