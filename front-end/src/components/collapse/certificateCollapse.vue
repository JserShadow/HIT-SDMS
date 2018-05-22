<template>
  <div style="margin-bottom: 10px">
    <div v-if="certificateStatus === '待填写'" class="no-data">暂无数据</div>
    <div v-else>
      <div v-for="(certificate, index) in certificates.certificates" :key="certificate._id" class="flex-collapse">
        <div>
          <span>{{certificate.detail}}</span>
          <span>{{certificate.year + certificate.term}}</span>
        </div>
        <el-button type="danger" size="mini" round @click="removeCertificate(index)">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CertificateCollapse',
  props: [ 'certificates', 'certificateStatus' ],
  methods: {
    async removeCertificate(index) {
      const arr = this.certificates;
      arr.certificates.splice(index, 1);
      const res = await axios.post('/certificate/removeCertificates', {
        openId: localStorage.getItem('userID'),
        certificates: arr
      });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$emit('reloadCertificates');
      }
    }
  }
}
</script>

<style scoped>
  .flex-collapse {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  font-size: .875rem;
  color: #333;
}
</style>
