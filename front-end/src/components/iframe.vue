<template>
<div>
  <iframe style="width: 180vw;height: 200vh;" :src="transcript" frameborder="0"></iframe>
  <van-dialog
    v-model="show"
    style="word-wrap: break-all"
  >
    <p>该页面为学生成绩单预览</p>
    <p>PC端查看请长按复制以下网址:</p>
    <p>{{transcript}}</p>
  </van-dialog>
</div>
</template>

<script>
export default {
  name: 'Transcript',
  data() {
    return {
      transcript: '',
      show: false
    }
  },
  mounted() {
    this.transcript = `https://hit-sdms.xiaonei.io/transcript?userID=${localStorage.getItem('userID')}#/`;
    this.show = true;
  }
}
</script>

<style>

</style>
