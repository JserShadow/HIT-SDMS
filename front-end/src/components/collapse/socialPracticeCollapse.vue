<template>
  <div style="margin-bottom: 10px">
    <div v-if="socialPracticeStatus === '待填写'" class="no-data">暂无数据</div>
    <div v-else>
      <div v-for="(socialPractice, index) in socialPractices.socialPractices" :key="socialPractice._id" class="flex-collapse">
        <div>
          <span>{{socialPractice.detail}}</span>
          <span>{{socialPractice.year + socialPractice.term}}</span>
        </div>
        <el-button type="danger" size="mini" round @click="removeSocialPractice(index)">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SocialPracticeCollapse',
  props: [ 'socialPractices', 'socialPracticeStatus' ],
  methods: {
    async removeSocialPractice(index) {
      const arr = this.socialPractices;
      arr.socialPractices.splice(index, 1);
      const res = await axios.post('/socialPractice/removeSocialPractices', {
        openId: localStorage.getItem('userID'),
        socialPractices: arr
      });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$emit('reloadSocialPractices');
      }
    }
  }
}
</script>

<style>
.no-data {
  width: 100%;
  height: 1.25rem;
  color: #aaaaaa;
}
.flex-collapse {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  font-size: .875rem;
  color: #333;
}
</style>
