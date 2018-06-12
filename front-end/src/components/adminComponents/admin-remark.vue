<template>
  <el-tabs type="border-card">
    <el-tab-pane label="待审核">
      <admin-remark-table @refresh="refreshData" :requiredData="requiredData.waiting" :needOperator="true"></admin-remark-table>
    </el-tab-pane>
    <el-tab-pane label="审核通过">
      <admin-remark-table @refresh="refreshData" :requiredData="requiredData.success" :needOperator="false"></admin-remark-table>
    </el-tab-pane>
    <el-tab-pane label="审核未通过">
      <admin-remark-table @refresh="refreshData" :requiredData="requiredData.fail" :needOperator="false"></admin-remark-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from 'axios'
import AdminRemarkTable from './admin-remark-table';
export default {
  components: {
    AdminRemarkTable
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
      const res = await axios.get('/admin/remark/getAllRemarks');
      if (res.data.message === 'ok') {
        this.requiredData = res.data.remarks;
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
