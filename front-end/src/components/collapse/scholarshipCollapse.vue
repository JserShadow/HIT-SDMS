<template>
  <div style="margin-bottom: 10px">
    <div v-if="scholarshipStatus === '待填写'" class="no-data">暂无数据</div>
    <div v-else>
      <div v-for="(scholarship, index) in scholarships.scholarships" :key="scholarship._id" class="flex-collapse">
        <div class="innerflex">
          <span>{{scholarship.detail}}</span>
          <span class="time">{{scholarship.year + scholarship.term}}</span>
        </div>
        <el-button style="color: #ff3333" type="text" size="mini" round @click="removeScholarship(index)">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ScholarshipCollapse',
  props: [ 'scholarships', 'scholarshipStatus' ],
  data() {
    return {
      activeName: '0'
    }
  },
  methods: {
    async removeScholarship(index) {
      const arr = this.scholarships;
      arr.scholarships.splice(index, 1);
      const res = await axios.post('/scholarship/removeScholarships', {
        openId: localStorage.getItem('userID'),
        scholarships: arr
      });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$emit('reloadScholarships');
      }
    }
  }
}
</script>

<style scoped>
.flex-collapse {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  font-size: .875rem;
  color: #333;
}
.innerflex {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.time {
  color: #cccccc;
}
</style>
