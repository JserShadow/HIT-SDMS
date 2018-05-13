<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix" style="display: flex;justify-content: space-between">
        <div>
          <span>奖学金内容管理</span>
          <el-input v-model="scholarshipName" placeholder="请输入奖学金名称" size="mini"></el-input>
        </div>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addScholarship">添加</el-button>
      </div>
      <div v-if="!scholarships.length" style="color: #cccccc">暂无数据</div>
      <div v-else v-for="scholarship in scholarships" :key="scholarship._id" class="flex-list">
        <div>{{scholarship.name}}</div>
        <el-button size="mini" round @click="removeScholarship(scholarship)" type="danger">删除</el-button>
      </div>
    </el-card>
    <el-tabs type="border-card" style="margin-top: 20px">
      <el-tab-pane label="待审核">
        <admin-scholarship-table @refresh="refreshData" :requiredData="requiredData.waiting" :needOperator="true"></admin-scholarship-table>
      </el-tab-pane>
      <el-tab-pane label="审核通过">
        <admin-scholarship-table @refresh="refreshData" :requiredData="requiredData.success" :needOperator="false"></admin-scholarship-table>
      </el-tab-pane>
      <el-tab-pane label="审核未通过">
        <admin-scholarship-table @refresh="refreshData" :requiredData="requiredData.fail" :needOperator="false"></admin-scholarship-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios';
import AdminScholarshipTable from './admin-scholarship-table';
export default {
  name: 'AdminScholarship',
  components: {
    AdminScholarshipTable
  },
  data() {
    return {
      scholarshipName: '',
      scholarships: [],
      requiredData: {
        waiting: [],
        success: [],
        fail: []
      }
    }
  },
  methods: {
    async reloadScholarships() {
      const res = await axios.get('/admin/scholarship/getAllScholarships');
      if (res.data.message === 'ok') {
        this.scholarships = res.data.scholarships;
      }
    },
    async addScholarship() {
      const res = await axios.post('/admin/scholarship/addScholarship', { scholarshipName: this.scholarshipName });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '添加成功'
        });
        this.scholarshipName = '';
        await this.reloadScholarships();
      } else {
        this.$message.error('该奖学金已存在');
      }
    },
    async removeScholarship(scholarship) {
      const res = await axios.post('/admin/scholarship/removeScholarship', { id: scholarship._id });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '删除成功'
        });
        await this.reloadScholarships();
      }
    },
    async refreshData() {
      const res = await axios.get('/admin/scholarship/getAllStudentScholarships');
      if (res.data.message === 'ok') {
        this.requiredData = res.data.studentScholarships;
      }
    }
  },
  async mounted() {
    await this.reloadScholarships();
    await this.refreshData();
  }
}
</script>

<style scoped>
.el-input {
  width: 40vw;
}
.el-card__header {
  padding: 8px 10px;
}
.flex-list {
  display: flex;
  justify-content: space-between;
  padding: 3px 20vw;
}
</style>
