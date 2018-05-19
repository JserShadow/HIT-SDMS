'use strict';

const { Controller } = require('egg');

class ScoreController extends Controller {
  async getAllScores() {
    const { openId } = this.ctx.request.body;
    const { Score } = this.ctx.model;
    const res = await Score.find({ openId }).sort({'gradeName': 1});
    for (let i = 1; i < res.length; i++) {
      if (!res[1]) {
        break;
      }
      if (res[i].gradeName.year === res[i-1].gradeName.year) {
        if (res[i].gradeName.term === '春季学期' && res[i-1].gradeName.term === '夏季学期') {
          let a = res[i];
          res[i] = res[i-1];
          res[i-1] = a;
        }
      }
    }
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
  async deleteScore() {
    const { score } = this.ctx.request.body;
    const { Score } = this.ctx.model;
    const res = await Score.remove({ _id: score._id, openId: score.openId });
    this.ctx.body = { message: 'ok' };
  }
  async updateScore() {
    const { score } = this.ctx.request.body;
    const { Score } = this.ctx.model;
    await Score.update({ _id: score._id, openId: score.openId }, score);
    this.ctx.body = { message: 'ok' };
  }
}
module.exports = ScoreController;
