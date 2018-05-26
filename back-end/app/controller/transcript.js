'use strict';

const { Controller } = require('egg');
class TranscriptController extends Controller {
  async getPage() {
    await this.ctx.render('transcript');
  }
}
module.exports = TranscriptController;
