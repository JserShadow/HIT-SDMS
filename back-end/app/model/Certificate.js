'use strict';

module.exports = app => {
  const { mongoose } = app;
  const CertificateSchema = new mongoose.Schema({
    openId: { type: String },
    status: { type: String },
    certificates: { type: Array }
  });
  return mongoose.model('Certificate', CertificateSchema);
}