<template>
  <van-popup v-model="showScholarshipPopup" position="right" :overlay="false" style="height:100vh;width: 100vw;overflow-y: scroll">
    <div class="popup-header">添加奖学金</div>
    <div class="cell-flex set-margin">
      <div>学年: {{scholarshipObj.year}}</div>
      <van-button size="small" type="primary" @click="chooseScholarshipYear">选择学年</van-button>
    </div>
    <div class="cell-flex set-margin">
      <div>学期: {{scholarshipObj.term}}</div>
      <van-button size="small" type="primary" @click="chooseScholarshipTerm">选择学期</van-button>
    </div>
    <div class="cell-flex set-margin">
      <div>选择奖学金类型: </div>
      <el-select v-model="scholarshipObj.name" placeholder="请选择奖学金">
        <el-option
          v-for="item in adminScholarships"
          :key="item._id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </div>
    <div class="cell-flex set-margin">
      <div>填写金额: </div>
      <el-input v-model="scholarshipObj.detail" placeholder="请输入详细内容" style="width: 50vw"></el-input>
    </div>
    <van-row class="btn-position">
      <van-col span="12">
        <van-button bottom-action @click="updateScholarship">提交</van-button>
      </van-col>
      <van-col span="12">
        <van-button type="primary" bottom-action @click="cancelUpdateScholarship">取消</van-button>
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
  name: 'ScholarshipPopup',
  props: ['showScholarshipPopup', 'adminScholarships'],
  data() {
    return {
      pickerColumn: [],
      yearColumn: ['2014','2015','2016','2017','2018','2019','2020'],
      termColumn: ['春季学期', '夏季学期','秋季学期'],
      scholarshipObj: {
        name: '',
        year: '',
        term: '',
        detail: ''
      },
      scholarships: [],
      showPicker: false,
      scholarshipDetail: ''
    }
  },
  methods: {
    chooseScholarshipYear() {
      this.pickerColumn = this.yearColumn.concat();
      this.showPicker = true;
    },
    chooseScholarshipTerm() {
      this.pickerColumn = this.termColumn.concat();
      this.showPicker = true;
    },
    pickerConfirm(val) {
      if (isNaN(parseInt(val))) {
        this.scholarshipObj.term = val;
      } else {
        this.scholarshipObj.year = val;
      }
      this.showPicker = false;
    },
    pickerCancel() {
      this.showPicker = false;
    },
    async updateScholarship() {
      const res = await axios.post('/scholarship/updateScholarships', {
        openId: localStorage.getItem('userID'),
        scholarship: this.scholarshipObj,
      });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.cancelUpdateScholarship();
        this.$emit('reloadScholarships');
      }
    },
    cancelUpdateScholarship() {
      this.scholarshipObj = {
        year: '',
        term: '',
        name: ''
      };
      this.$emit('closeScholarshipPopup');
    }
  }
}
</script>

<style scoped>
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
