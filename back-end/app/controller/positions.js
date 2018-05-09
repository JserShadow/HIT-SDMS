'use strict';

const { Controller } = require('egg');
const positions = require('../util/socialFunction');
const activities = require('../util/socialActivities');
const honor = require('../util/honorTitle');
const dorm = require('../util/dormBuilding');

class PositionsController extends Controller {
  async getAllPositions() {
    this.ctx.body = {
      positions,
      activities,
      honor,
      dorm,
    };
  }
}

module.exports = PositionsController;
