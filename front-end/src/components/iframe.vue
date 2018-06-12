<template>
  <iframe style="width: 150vw;height: 150vh;" :src="transcript" frameborder="0"></iframe>
</template>

<script>
export default {
  name: 'Transcript',
  data() {
    return {
      transcript: ''
    }
  },
  mounted() {
    this.transcript = `https://hit-sdms.xiaonei.io/transcript?userID=${localStorage.getItem('userID')}#/`;
    this.$alert('该页面为学生成绩单预览，PC端查看请长按复制以下网址：'+this.transcript, '预览须知', {
      confirmButtonText: '确定',
    });
  }
}
</script>

<style>

</style>
