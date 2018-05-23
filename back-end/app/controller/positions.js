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
  sortArr(arr) {
    arr.sort((a,b) => {
      return a.year - b.year;
    })
    for (let i = 1; i < arr.length; i++) {
      if (!arr[1]) {
        break;
      }
      if (arr[i].year === arr[i-1].year) {
        if (arr[i].term === '春季学期' && arr[i-1].term === '夏季学期'||arr[i].term === '夏季学期' && arr[i-1].term === '秋季学期'||arr[i].term === '春季学期' && arr[i-1].term === '秋季学期') {
          let a = arr[i];
          arr[i] = arr[i-1];
          arr[i-1] = a;
        }
      }
    }
    return arr;
  }
  async getAllSecondclassInfo() {
    const { openId } = this.ctx.request.body;
    const { Secondclass } = this.ctx.model;
    const res = await Secondclass.find({ openId });
    res[0].position = this.sortArr(res[0].position);
    res[0].activities = this.sortArr(res[0].activities);
    res[0].honor = this.sortArr(res[0].honor);
    res[0].dorm = this.sortArr(res[0].dorm);
    res[0].decrease = this.sortArr(res[0].decrease);
    console.log(res);
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
  async updateDelete() {
    const { openId, result } = this.ctx.request.body;
    const { Secondclass } = this.ctx.model;
    const res = await Secondclass.update({ openId }, result);
    if (res.ok === 1) {
      this.ctx.body = {
        message: 'ok'
      }
    }
  }
}

module.exports = PositionsController;
