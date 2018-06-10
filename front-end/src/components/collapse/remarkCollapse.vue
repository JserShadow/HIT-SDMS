<template>
  <div style="margin-bottom: 10px">
    <div v-if="remarkStatus === '待填写'" class="no-data">暂无数据</div>
    <div v-else>
      <div v-for="(remark, index) in remarks.remarks" :key="remark._id" class="flex-collapse">
        <div class="innerflex">
          <span>{{remark.remark}}</span>
          <span class="time">{{remark.year + remark.term}}</span>
        </div>
        <el-button style="color: #ff3333" type="text" size="mini" round @click="removeRemark(index)">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: [ 'remarks', 'remarkStatus' ],
  methods: {
    async removeRemark(index) {
      const arr = this.remarks;
      arr.remarks.splice(index, 1);
      const res = await axios.post('/certificate/removeRemarks', {
        openId: localStorage.getItem('userID'),
        remarks: arr
      });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$emit('reloadRemarks');
      }
    }
  }
}
</script>

<style>

</style>
