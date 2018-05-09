<template>
  <div>
    <el-tabs type="border-card" @tab-click="changeTab">
      <el-tab-pane label="待审核">
        <admin-score-table @refresh="refreshData" :requiredData="waitingData" :needOperator="true"></admin-score-table>
      </el-tab-pane>
    
      <el-tab-pane label="审核通过">
        <admin-score-table @refresh="refreshData" :requiredData="passData" :needOperator="false"></admin-score-table>
      </el-tab-pane>
      <el-tab-pane label="审核未通过">
        <admin-score-table @refresh="refreshData" :requiredData="failData" :needOperator="false"></admin-score-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios';
import AdminScoreTable from './admin-score-table';
export default {
  components: {
    AdminScoreTable
  },
  data() {
    return {
      waitingData: [],
      passData: [],
      failData: [],
      tabIndex: '0'
    }
  },
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index;
    },
    async refreshData() {
      const res = await axios.get('/admin/score/getAllScores');
      this.waitingData = res.data.resData.waiting;
      this.passData = res.data.resData.pass;
      this.failData = res.data.resData.fail;
    }
  },
  async mounted() {
    const res = await axios.get('/admin/score/getAllScores');
    this.waitingData = res.data.resData.waiting;
    this.passData = res.data.resData.pass;
    this.failData = res.data.resData.fail;
  }
}
</script>

<style>

</style>
