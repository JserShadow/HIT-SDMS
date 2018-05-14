<template>
  <div>
    <div v-if="technologyStatus === '待填写'">暂无数据</div>
    <div v-else>
      <div v-for="(technology, index) in technologys.technologys" :key="technology._id" class="flex-collapse">
        <div>
          <span>{{technology.name}}</span>
          <span>{{technology.year + technology.term}}</span>
        </div>
        <el-button type="danger" size="mini" round @click="removeTechnology(index)">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TechnologyCollapse',
  props: [ 'technologys', 'technologyStatus' ],
  methods: {
    async removeTechnology(index) {
      const arr = this.technologys;
      arr.technologys.splice(index, 1);
      const res = await axios.post('/technology/removeTechnologys', {
        openId: localStorage.getItem('userID'),
        technologys: arr
      });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$emit('reloadTechnologys');
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
