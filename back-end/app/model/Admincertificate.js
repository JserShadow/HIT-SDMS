'use strict';

module.exports = app => {
  const { mongoose } = app;
  const AdminCertificateSchema = new mongoose.Schema({
    name: { type: String }
  });
  return mongoose.model('Admincertificate', AdminCertificateSchema);
}
