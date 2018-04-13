'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async addUser(wxUserInfo) {
    const { openId, nickName, avatarUrl, gender, city, country, province, language } = wxUserInfo;
    const findRes = await this.ctx.model.Users.find({ openId });
    if (findRes.length === 0) {
      const newUser = new this.ctx.model.Users({ openId, nickName, avatarUrl, gender, city, country, province, language });
      await newUser.save();
    } else {
      await this.ctx.model.Users.update({ openId }, { nickName, avatarUrl, gender, city, country, province, language });
    }
  }
}

module.exports = LoginService;
