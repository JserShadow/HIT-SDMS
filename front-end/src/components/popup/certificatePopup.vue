<template>
  <van-popup v-model="showCertificatePopup" position="right" :overlay="false" style="height:100vh;width: 100vw;overflow-y: scroll">
    <div class="popup-header">添加其他证书</div>
    <div class="cell-flex set-margin">
      <div>学年: {{certificateObj.year}}</div>
      <van-button size="small" type="primary" @click="chooseCertificateYear">选择学年</van-button>
    </div>
    <div class="cell-flex set-margin">
      <div>学期: {{certificateObj.term}}</div>
      <van-button size="small" type="primary" @click="chooseCertificateTerm">选择学期</van-button>
    </div>
    <div class="cell-flex set-margin">
      <div>选择证书类型: </div>
      <el-select v-model="selectedOptions" placeholder="请选择证书">
        <el-option
          v-for="item in certificateSelections"
          :key="item.name"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </div>
    <div class="cell-flex set-margin">
      <div>填写分数: </div>
      <el-input v-model="certificateDetail" placeholder="请输入分数" style="width: 50vw"></el-input>
    </div>
    <van-row class="btn-position">
      <van-col span="12">
        <van-button bottom-action @click="updateCertificate">提交</van-button>
      </van-col>
      <van-col span="12">
        <van-button type="primary" bottom-action @click="cancelUpdateCertificate">取消</van-button>
      </van-col>
    </van-row>
    <van-popup position="bottom" transition="popup-slide" style="width: 100vw;height: 30vh" v-model="showPicker">
      <van-picker :columns="pickerColumn" show-toolbar @cancel="pickerCancel" @confirm="pickerConfirm"></van-picker>
    </van-popup>
  </van-popup>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CertificatePopup',
  props: ['showCertificatePopup', 'certificateSelections'],
  data() {
    return {
      pickerColumn: [],
      yearColumn: ['2014','2015','2016','2017','2018','2019','2020'],
      termColumn: ['春季学期', '夏季学期','秋季学期'],
      selectedOptions: '',
      certificateObj: {
        name: '',
        year: '',
        term: '',
        detail: ''
      },
      certificates: [],
      showPicker: false,
      certificateDetail: ''
    }
  },
  methods: {
    chooseCertificateYear() {
      this.pickerColumn = this.yearColumn.concat();
      this.showPicker = true;
    },
    chooseCertificateTerm() {
      this.pickerColumn = this.termColumn.concat();
      this.showPicker = true;
    },
    pickerConfirm(val) {
      if (isNaN(parseInt(val))) {
        this.certificateObj.term = val;
      } else {
        this.certificateObj.year = val;
      }
      this.showPicker = false;
    },
    pickerCancel() {
      this.showPicker = false;
    },
    async updateCertificate() {
      this.certificateObj.name = this.selectedOptions;
      this.certificateObj.detail = this.certificateDetail;
      const res = await axios.post('/certificate/updateCertificates', {
        openId: localStorage.getItem('userID'),
        certificate: this.certificateObj,
      });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.cancelUpdateCertificate();
        this.$emit('reloadCertificates');
      }
    },
    cancelUpdateCertificate() {
      this.certificateObj = {
        year: '',
        weight: 0,
        term: '',
        name: ''
      };
      this.$emit('closeCertificatePopup');
    }
  }
}
</script>

<style>
.cell-flex {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}
.set-margin {
  margin-bottom: 15px;
}
.btn-position {
  margin-top: 20px;
}
.popup-header {
  font-size: 1.5625rem;
  padding: 10px;
  letter-spacing: 5px;
}
</style>
