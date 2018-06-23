'use strict';

const { Controller } = require('egg');
const fs = require('fs-extra');
const zip = require('node-native-zip');

const archive = new zip();

class ExportController extends Controller {
  async getZip() {
    const arr = await this.ctx.service.export.getCsv();
    await new Promise((resolve, reject) => {
      archive.addFiles(arr, function(err) {
        if (err) reject(err);
        resolve();
      });
    });
    const buff = archive.toBuffer();
    fs.writeFileSync('./app/public/pdfs.zip', buff);
    this.ctx.body = {
      message: 'ok',
    };
  }
  async removeFiles() {
    const data = fs.readdirSync('./app/public/pdfs');
    for (const file of data) {
      fs.unlinkSync('./app/public/pdfs/' + file);
    }
    fs.unlinkSync('./app/public/pdfs.zip');
    this.ctx.body = {
      message: 'ok',
    };
  }
}

module.exports = ExportController;
