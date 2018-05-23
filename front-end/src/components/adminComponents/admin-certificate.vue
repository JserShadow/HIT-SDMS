<template>
<div>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix" style="display: flex;justify-content: space-between">
      <span>其他证书内容管理</span>
      <div>
        <el-input v-model="certificateName" placeholder="请输入证书名称" size="mini" style="margin-right: 6px"></el-input>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addCertificate">添加</el-button>
      </div>
    </div>
    <div v-if="!certificates.length" style="color: #cccccc">暂无数据</div>
    <div v-else v-for="certificate in certificates" :key="certificate._id" class="flex-list">
      <div>{{certificate.name}}</div>
      <el-button size="mini" round @click="removeCertificate(certificate)" type="danger">删除</el-button>
    </div>
  </el-card>
  <el-tabs type="border-card" style="margin-top: 20px">
    <el-tab-pane label="待审核">
      <admin-certificate-table @refresh="refreshData" :requiredData="requiredData.waiting" :needOperator="true"></admin-certificate-table>
    </el-tab-pane>
    <el-tab-pane label="审核通过">
      <admin-certificate-table @refresh="refreshData" :requiredData="requiredData.success" :needOperator="false"></admin-certificate-table>
    </el-tab-pane>
    <el-tab-pane label="审核未通过">
      <admin-certificate-table @refresh="refreshData" :requiredData="requiredData.fail" :needOperator="false"></admin-certificate-table>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import axios from 'axios'
import AdminCertificateTable from './admin-certificate-table';
export default {
  name: 'AdminCertificate',
  components: {
    AdminCertificateTable
  },
  data() {
    return {
      certificateName: '',
      certificates: [],
      requiredData: {
        waiting: [],
        success: [],
        fail: []
      }
    }
  },
  methods: {
    async reloadCertificates() {
      const res = await axios.get('/admin/certificate/getAllCertificates');
      if (res.data.message === 'ok') {
        this.certificates = res.data.certificates;
      }
    },
    async addCertificate() {
      const res = await axios.post('/admin/certificate/addCertificate', { certificateName: this.certificateName });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '添加成功'
        });
        this.certificateName = '';
        await this.reloadCertificates();
      } else {
        this.$message.error('该奖学金已存在');
      }
    },
    async removeCertificate(certificate) {
      const res = await axios.post('/admin/certificate/removeCertificate', { id: certificate._id });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '删除成功'
        });
        await this.reloadCertificates();
      }
    },
    async refreshData() {
      const res = await axios.get('/admin/certificate/getAllStudentCertificates');
      if (res.data.message === 'ok') {
        this.requiredData = res.data.certificates;
      }
    }
  },
  async mounted() {
    await this.reloadCertificates();
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
