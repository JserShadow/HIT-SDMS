'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const SecondclassSchema = new mongoose.Schema({
    openId: { type: String },
    status: { type: String },
    position: { type: Array },
    activities: { type: Array },
    dorm: { type: Array },
    honor: { type: Array },
    decrease: { type: Array },
  });
  return mongoose.model('Secondclass', SecondclassSchema);
}
