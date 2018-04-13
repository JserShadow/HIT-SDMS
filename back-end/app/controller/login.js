'use strict';

const Controller = require('egg').Controller;
const axios = require('axios');
const exec = require('child_process').exec;
const wx = require('wx-biz-data-crypt');

class LoginController extends Controller {
  async login() {
    const { code, encry, iv } = this.ctx.query;
    const { appId, appSecret, getSessionKeyUrl } = this.config;
    const requestUrl = `${getSessionKeyUrl}?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    const result = await axios.get(requestUrl);
    const { session_key, openid } = result.data;
    const newSession = await this.getNewSessionKey();
    // 解密encryptedData 得到全部信息
    const wxencry = new wx(appId, session_key);
    const wxUserInfo = wxencry.decryptData(encry, iv);
    await this.ctx.service.login.addUser(wxUserInfo);
    this.ctx.body = {
      userInfo: wxUserInfo,
      newCookie: JSON.stringify({
        key: newSession,
        value: openid,
      }),
    };
  }
  async getNewSessionKey() {
    return new Promise(resolve => {
      exec('head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 168', (err, stdout, stderr) => {
        resolve(stdout);
      });
    });
  }
  async getUserInfo() {
    const value = this.ctx.request.body.value;
    console.log(this.ctx.request.body);
    const { Users } = this.ctx.model;
    const mongoRes = await Users.find({ openId: value });
    console.log(1);
    console.log(mongoRes);
    this.ctx.body = mongoRes;
  }
}

module.exports = LoginController;
