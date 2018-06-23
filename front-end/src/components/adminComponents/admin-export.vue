<template>
  <div class="center" v-loading="loading"
    element-loading-text="正在打包"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div>
      <el-button type="primary" @click="exportToCsv">导出所有PDF文件</el-button>
      <p>
        请不要在IE浏览器使用该功能
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async exportToCsv() {
      this.loading = true;
      let res;
      try {
        res = await axios.get('/export', {}, {
          timeout: 1000*60*60*3
        });
      } catch (error) {
        console.dir(error)
        return;
      }
      if (res.data.message === 'ok') {
        this.loading = false;
        window.open('https://hit-sdms.xiaonei.io/pdfs.zip');
      }
      setTimeout(async () => {
        await axios.get('/removeFiles');
      }, 5000);
    }
  }
}
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
