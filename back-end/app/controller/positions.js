'use strict';

const { Controller } = require('egg');
const positions = require('../util/socialFunction');
const activities = require('../util/socialActivities');
const honor = require('../util/honorTitle');
const dorm = require('../util/dormBuilding');
const decrease = require('../util/decrease');
const tech = require('../util/technology');

class PositionsController extends Controller {
  async getAllPositions() {
    this.ctx.body = {
      positions,
      activities,
      honor,
      dorm,
      decrease,
      tech,
    };
  }
  async getAllSecondclassInfo() {
    const { openId } = this.ctx.request.body;
    const { Secondclass } = this.ctx.model;
    const res = await Secondclass.find({ openId });
    this.ctx.body = {
      message: 'ok',
      res
    };
  }
  async submitSecondclass() {
    const { openId, selected } = this.ctx.request.body;
    const { Secondclass } = this.ctx.model;
    const findres = await Secondclass.find({ openId });
    if (findres.length === 0) {
      const Info = new Secondclass(selected);
      await Info.save();
      this.ctx.body = {
        message: 'ok',
      };
    } else {
      const res = await Secondclass.update({ openId }, selected);
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
}

module.exports = PositionsController;
