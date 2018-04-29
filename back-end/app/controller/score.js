'use strict';

const { Controller } = require('egg');

class ScoreController extends Controller {
  async getAllScores() {
    const { openId } = this.ctx.request.body;
    const { Score } = this.ctx.model;
    const res = await Score.find({ openId });
    this.ctx.body = {
      message: 'ok',
      scores: res,
    };
  }
  async addScore() {
    const { score } = this.ctx.request.body;
    const { Score } = this.ctx.model;
    const newScore = new Score(score);
    try {
      await newScore.save();
      this.ctx.body = { message: 'ok' };
    } catch (error) {
      console.log(error);
      this.ctx.body = { message: 'error' };
    }
  }
}
module.exports = ScoreController;
