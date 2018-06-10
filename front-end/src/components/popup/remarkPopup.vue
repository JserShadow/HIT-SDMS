<template>
  <van-popup v-model="showRemarkPopup" position="right" :overlay="false" style="height:100vh;width: 100vw;overflow-y: scroll">
    <div class="popup-header">添加备注</div>
    <div class="cell-flex set-margin">
      <div>学年: {{remarkObj.year}}</div>
      <van-button size="small" type="primary" @click="chooseRemarkYear">选择学年</van-button>
    </div>
    <div class="cell-flex set-margin">
      <div>学期: {{remarkObj.term}}</div>
      <van-button size="small" type="primary" @click="chooseRemarkTerm">选择学期</van-button>
    </div>
    <van-field label="填写备注内容" v-model="remarkObj.remark"></van-field>
    <van-row class="btn-position">
      <van-col span="12">
        <van-button bottom-action @click="updateRemark">提交</van-button>
      </van-col>
      <van-col span="12">
        <van-button type="primary" bottom-action @click="cancelUpdateRemark">取消</van-button>
      </van-col>
    </van-row>
    <van-popup position="bottom" transition="popup-slide" style="width: 100vw;height: 30vh" v-model="showPicker">
      <van-picker :columns="pickerColumn" show-toolbar @cancel="pickerCancel" @confirm="pickerConfirm"></van-picker>
    </van-popup>
  </van-popup>
</template>

<script>
import axios from 'axios';
export default {
  props: [ 'showRemarkPopup' ],
  data() {
    return {
      pickerColumn: [],
      yearColumn: ['2014','2015','2016','2017','2018','2019','2020'],
      termColumn: ['春季学期', '夏季学期','秋季学期'],
      remarkObj: {
        year: '',
        term: '',
        remark: ''
      },
      showPicker: false,
    }
  },
  methods: {
    chooseRemarkYear() {
      this.pickerColumn = this.yearColumn.concat();
      this.showPicker = true;
    },
    chooseRemarkTerm() {
      this.pickerColumn = this.termColumn.concat();
      this.showPicker = true;
    },
    pickerConfirm(val) {
      if (isNaN(parseInt(val))) {
        this.remarkObj.term = val;
      } else {
        this.remarkObj.year = val;
      }
      this.showPicker = false;
    },
    pickerCancel() {
      this.showPicker = false;
    },
    async updateRemark() {
      const res = await axios.post('/remark/updateRemarks', {
        openId: localStorage.getItem('userID'),
        remark: this.remarkObj,
      });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.cancelUpdateRemark();
        this.$emit('reloadRemarks');
      }
    },
    cancelUpdateRemark() {
      this.remarkObj = {
        year: '',
        term: '',
        remark: '',
      };
      this.$emit('closeRemarkPopup');
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
