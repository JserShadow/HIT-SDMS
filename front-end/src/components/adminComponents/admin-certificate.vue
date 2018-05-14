<template>
<div>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix" style="display: flex;justify-content: space-between">
      <div>
        <span>其他证书内容管理</span>
        <el-input v-model="certificateName" placeholder="请输入证书名称" size="mini"></el-input>
      </div>
      <el-button style="float: right; padding: 3px 0" type="text" @click="addCertificate">添加</el-button>
    </div>
    <div v-if="!certificates.length" style="color: #cccccc">暂无数据</div>
    <div v-else v-for="certificate in certificates" :key="certificate._id" class="flex-list">
      <div>{{certificate.name}}</div>
      <el-button size="mini" round @click="removeCertificate(certificate)" type="danger">删除</el-button>
    </div>
  </el-card>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AdminCertificate',
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
  },
  async mounted() {
    await this.reloadCertificates();
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
