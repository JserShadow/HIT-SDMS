<template>
  <web-view :src="webViewUrl"></web-view>
</template>

<script>
import utils from '../../utils/index'
export default {
  data() {
    return {
      webViewUrl: ''
    }
  },
  mounted() {
    const openID = wx.getStorageSync('openID');
    this.webViewUrl = `${utils.webViewUrl}?userID=${openID}&from=mina`;
  }
}
</script>

<style>

</style>
