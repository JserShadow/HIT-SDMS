'use strict';

module.exports = app => {
  const { mongoose } = app;
  const TechnologySchema = new mongoose.Schema({
    openId: { type: String },
    status: { type: String },
    technologys: { type: Array },
  })
  return mongoose.model('Technology', TechnologySchema);
}
