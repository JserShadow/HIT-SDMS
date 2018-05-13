<template>
  <div>
    <div v-if="scholarshipStatus === '待填写'">暂无数据</div>
    <div v-else>
      <div v-for="(scholarship, index) in scholarships.scholarships" :key="scholarship._id" class="flex-collapse">
        <div>
          <span>{{scholarship.name}}</span>
          <span>{{scholarship.year + scholarship.term}}</span>
        </div>
        <el-button type="danger" size="mini" round @click="removeScholarship(index)">删除</el-button>
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
</style>
