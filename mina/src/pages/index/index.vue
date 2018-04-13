<template>
  <web-view :src="webViewUrl"></web-view>
</template>

<script>
import utils from '../../utils/index';
export default {
  data () {
    return {
      userInfo: {},
      cookie: '',
      webViewUrl: ''
    }
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      const _this = this;
      wx.login({
        success: (resp) => {  
          wx.getUserInfo({
            success: (res) => {
              if (resp.code && resp.errMsg === 'login:ok') {
                wx.request({
                  url: 'http://localhost:7001/login',
                  data: {
                    code: resp.code,
                    encry: res.encryptedData,
                    iv: res.iv
                  },
                  success(res) {
                    const { userInfo, newCookie } = res.data;
                    _this.userInfo = userInfo;
                    _this.cookie = newCookie;
                    wx.setStorageSync('cookie', newCookie);
                    const val = JSON.parse(newCookie).value;
                    _this.webViewUrl = `${ utils.webViewUrl }?userID=${ val }`;
                  }
                })
              }
            }
          })
        }
      })
    },
  },

  created () {
    const cookie = wx.getStorageSync('cookie');
    if (cookie) {
      const val = JSON.parse(cookie).value;
      this.webViewUrl = `${ utils.webViewUrl }?userID=${ val }`;
      console.log(this.webViewUrl);
      return;
    }
    this.getUserInfo();
  }
}
</script>

<style scoped>
</style>
