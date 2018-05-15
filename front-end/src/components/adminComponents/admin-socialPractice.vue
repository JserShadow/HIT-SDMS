<template>
  <el-tabs type="border-card">
    <el-tab-pane label="待审核">
      <admin-social-practice-table @refresh="refreshData" :requiredData="requiredData.waiting" :needOperator="true"></admin-social-practice-table>
    </el-tab-pane>
    <el-tab-pane label="审核通过">
      <admin-social-practice-table @refresh="refreshData" :requiredData="requiredData.success" :needOperator="false"></admin-social-practice-table>
    </el-tab-pane>
    <el-tab-pane label="审核未通过">
      <admin-social-practice-table @refresh="refreshData" :requiredData="requiredData.fail" :needOperator="false"></admin-social-practice-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from 'axios';
import AdminSocialPracticeTable from './admin-socialPractice-table';
export default {
  name: 'AdminSocialPractice',
  components: {
    AdminSocialPracticeTable
  },
  data() {
    return {
      requiredData: {
        waiting: [],
        success: [],
        fail: []
      }
    }
  },
  methods: {
    async refreshData() {
      const res = await axios.get('/admin/socialPractice/getAllSocialPractices');
      if (res.data.message === 'ok') {
        this.requiredData = res.data.socialPractices;
      }
    }
  },
  async mounted() {
    await this.refreshData();
  }
}
</script>

<style>

</style>
