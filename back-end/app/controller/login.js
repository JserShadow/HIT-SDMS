'use strict';

const Controller = require('egg').Controller;
const axios = require('axios');
const exec = require('child_process').exec;

class LoginController extends Controller {
  async login() {
    const { code } = this.ctx.query;
    const { appId, appSecret, getSessionKeyUrl } = this.config;
    const requestUrl = `${getSessionKeyUrl}?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    const result = await axios.get(requestUrl);
    const { session_key, openid } = result.data;
    const newSession = await this.getNewSessionKey();
    this.ctx.body = {
      session: newSession,
    };
  }
  async getNewSessionKey() {
    return new Promise((resolve, reject) => {
      exec('head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 168', (err, stdout, stderr) => {
        resolve(stdout);
      });
    });
  }
}

module.exports = LoginController;
