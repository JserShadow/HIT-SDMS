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
  created() {
    const openID = wx.getStorageSync('openID');
    this.webViewUrl = `${utils.webViewUrl}?userID=${openID}`;
  }
}
</script>

<style>

</style>
