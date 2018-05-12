'use strict';
module.exports = app => {
  const { mongoose } = app;
  const AdminscholarshipSchema = new mongoose.Schema({
    name: { type: String },
  })
  return mongoose.model('Adminscholarship', AdminscholarshipSchema);
}
