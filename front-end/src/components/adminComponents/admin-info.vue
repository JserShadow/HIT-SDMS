<template>
  <div>
    <el-tabs type="border-card" @tab-click="changeTab">
      <el-tab-pane label="待审核">
        <admin-info-table @refresh="refreshData" :infoData="infoData" :needOperator="needOperator"></admin-info-table>
      </el-tab-pane>
    
      <el-tab-pane label="审核通过">
        <admin-info-table @refresh="refreshData" :infoData="infoData" :needOperator="needOperator"></admin-info-table>
      </el-tab-pane>
      <el-tab-pane label="审核未通过">
        <admin-info-table @refresh="refreshData" :infoData="infoData" :needOperator="needOperator"></admin-info-table>
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
      infoData: [],
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
          this.infoData = this.requiredData.waiting;
          break;
        case '审核通过':
          this.infoData = this.requiredData.success;
          break;
        default:
          this.infoData = this.requiredData.failed;
          break;
      }
    },
    async refreshData() {
      const res = await axios.get('/admin/info/getAllInfos');
      this.infoData = res.data.waiting;
      this.requiredData = res.data;
    }
  },
  async mounted() {
    const res = await axios.get('/admin/info/getAllInfos');
    console.log(res.data);
    this.infoData = res.data.waiting;
    this.requiredData = res.data;
  }
}
</script>

<style>

</style>
