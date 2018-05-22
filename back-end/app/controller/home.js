'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');

class HomeController extends Controller {
  async index() {
    console.log(fs.readFileSync(__dirname+'/../public/index.html'));
    this.ctx.body = fs.readFileSync(__dirname+'/../public/index.html', 'utf8');
  }
}

module.exports = HomeController;
