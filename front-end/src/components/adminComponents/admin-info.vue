<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="待审核">
        <admin-info-table :tableData5="tableData5"></admin-info-table>
      </el-tab-pane>
    
      <el-tab-pane label="审核通过">
        <admin-info-table :tableData5="tableData5"></admin-info-table>
      </el-tab-pane>
      <el-tab-pane label="审核未通过">
        <admin-info-table :tableData5="tableData5"></admin-info-table>
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
      tableData5: []
    }
  },
  async created() {
    
  }
}
</script>

<style>

</style>
