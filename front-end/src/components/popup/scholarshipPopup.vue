<template>
  <van-popup v-model="showScholarshipPopup" position="right" :overlay="false">
    <div class="cell-flex set-margin">
      <div>学年: {{scholarshipObj.year}}</div>
      <van-button size="small" type="primary" @click="chooseScholarshipYear">选择学年</van-button>
    </div>
    <div class="cell-flex set-margin">
      <div>学期: {{scholarshipObj.term}}</div>
      <van-button size="small" type="primary" @click="chooseScholarshipTerm">选择学期</van-button>
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
      <van-picker :columns="pickerColumn" show-toolbar @confirm="pickerConfirm"></van-picker>
    </van-popup>
  </van-popup>
</template>

<script>
export default {
  name: 'ScholarshipPopup',
  props: ['showScholarshipPopup'],
  data() {
    return {
      pickerColumn: [],
      yearColumn: ['2014','2015','2016','2017','2018','2019','2020'],
      termColumn: ['春季学期', '夏季学期','秋季学期'],
      scholarshipObj: {
        name: '',
        year: '',
        term: '',
      },
      scholarships: []
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
    },
    updateScholarship() {

    },
    cancelUpdateScholarship() {
      
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
</style>
