<template>
  <el-tabs type="border-card">
    <el-tab-pane label="待审核">
      <admin-technology-table @refresh="refreshData" :requiredData="requiredData.waiting" :needOperator="true"></admin-technology-table>
    </el-tab-pane>
    <el-tab-pane label="审核通过">
      <admin-technology-table @refresh="refreshData" :requiredData="requiredData.success" :needOperator="false"></admin-technology-table>
    </el-tab-pane>
    <el-tab-pane label="审核未通过">
      <admin-technology-table @refresh="refreshData" :requiredData="requiredData.fail" :needOperator="false"></admin-technology-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from 'axios';
import AdminTechnologyTable from './admin-technology-table'
export default {
  name: 'AdminTechnology',
  components: { AdminTechnologyTable },
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
      const res = await axios.get('/admin/technology/getAllTechnologys');
      if (res.data.message === 'ok') {
        this.requiredData = res.data.technologys;
      }
    },
  },
  async mounted() {
    await this.refreshData();
  }
}
</script>

<style scoped>

</style>
