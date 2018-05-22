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
  pushIntoArr(oldObj, cat, obj) {
    switch (cat) {
      case 'positions': oldObj.position.push(obj);break;
      case 'activities': oldObj.activities.push(obj);break;
      case 'honor': oldObj.honor.push(obj);break;
      case 'dorm': oldObj.dorm.push(obj);break;
      case 'decrease': oldObj.decrease.push(obj);break;
      default:break;
    }
    return oldObj;
  }
  async submitSecondclass() {
    const { openId, catagory, content } = this.ctx.request.body;
    const { Secondclass } = this.ctx.model;
    const findres = await Secondclass.find({ openId });
    if (findres.length === 0) {
      const doc = {
        openId,
        status: '待审核',
        decrease: [],
        honor: [],
        dorm: [],
        activities: [],
        position: []
      }
      doc = this.pushIntoArr(doc, catagory, content);
      const Info = new Secondclass(doc);
      await Info.save();
      this.ctx.body = {
        message: 'ok',
      };
    } else {
      const newObj = this.pushIntoArr(findres[0], catagory, content);
      newObj.status = '待审核';
      const res = await Secondclass.update({ openId }, newObj);
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
}

module.exports = PositionsController;
