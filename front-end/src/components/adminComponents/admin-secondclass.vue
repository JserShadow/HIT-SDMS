<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="待审核">
        <admin-secondclass-table @reload="reloadData" :requiredData="secondClassInfo.waiting" :needOperator="true"></admin-secondclass-table>
      </el-tab-pane>
    
      <el-tab-pane label="审核通过">
        <admin-secondclass-table @reload="reloadData" :requiredData="secondClassInfo.success" :needOperator="false"></admin-secondclass-table>
      </el-tab-pane>
      <el-tab-pane label="审核未通过">
        <admin-secondclass-table @reload="reloadData" :requiredData="secondClassInfo.fail" :needOperator="false"></admin-secondclass-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios';
import adminSecondclassTable from './admin-secondclass-table';
export default {
  components: {
    adminSecondclassTable
  },
  data() {
    return {
      secondClassInfo: {
        waiting: [],
        success: [],
        fail: [],
      }
    }
  },
  methods: {
    async reloadData() {
      const res = await axios.get('/admin/secondclass/getAllSecondClassInfos');
      if (res.data.message === 'ok') {
        this.secondClassInfo = {
          waiting: res.data.waiting,
          success: res.data.success,
          fail: res.data.fail,
        }
      }
    }
  },
  async mounted() {
    await this.reloadData();
  }
}
</script>

<style>

</style>
