<template>
  <div>
    <el-tabs type="border-card" @tab-click="changeTab">
      <el-tab-pane label="待审核">
        <admin-info-table @refresh="refreshData" :tableData5="tableData5" :needOperator="needOperator"></admin-info-table>
      </el-tab-pane>
    
      <el-tab-pane label="审核通过">
        <admin-info-table @refresh="refreshData" :tableData5="tableData5" :needOperator="needOperator"></admin-info-table>
      </el-tab-pane>
      <el-tab-pane label="审核未通过">
        <admin-info-table @refresh="refreshData" :tableData5="tableData5" :needOperator="needOperator"></admin-info-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import AdminInfoTable from './admin-info-table';
export default {
  components: {
    AdminInfoTable,
  },
  data() {
    return {
      tableData5: [],
      needOperator: true,
      requiredData: '',
    }
  },
  methods: {
    changeTab(tab) {
      if (parseInt(tab.index)) {
        this.needOperator = false;
      } else {
        this.needOperator = true;
      }
      switch (tab.label) {
        case '待审核':
          this.tableData5 = this.requiredData.waiting;
          break;
        case '审核通过':
          this.tableData5 = this.requiredData.success;
          break;
        default:
          this.tableData5 = this.requiredData.failed;
          break;
      }
    },
    async refreshData() {
      const res = await axios.get('/admin/info/getAllInfos');
      this.tableData5 = res.data.waiting;
      this.requiredData = res.data;
    }
  },
  async mounted() {
    const res = await axios.get('/admin/info/getAllInfos');
    this.tableData5 = res.data.waiting;
    this.requiredData = res.data;
  }
}
</script>

<style>

</style>
