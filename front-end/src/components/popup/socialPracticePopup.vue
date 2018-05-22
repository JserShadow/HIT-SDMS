<template>
  <van-popup v-model="showSocialPracticePopup" position="right" :overlay="false" style="height:100vh;width: 100vw;overflow-y: scroll">
    <div class="popup-header">添加社会实践</div>
    <div class="cell-flex set-margin">
      <div>学年: {{socialPracticeObj.year}}</div>
      <van-button size="small" type="primary" @click="chooseSocialPracticeYear">选择学年</van-button>
    </div>
    <div class="cell-flex set-margin">
      <div>学期: {{socialPracticeObj.term}}</div>
      <van-button size="small" type="primary" @click="chooseSocialPracticeTerm">选择学期</van-button>
    </div>
    <van-field v-model="socialPracticeContents" placeholder="请输入社会实践内容"></van-field>
    <van-row class="btn-position">
      <van-col span="12">
        <van-button bottom-action @click="updateSocialPractice">提交</van-button>
      </van-col>
      <van-col span="12">
        <van-button type="primary" bottom-action @click="cancelUpdateSocialPractice">取消</van-button>
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
  name: 'SocialPracticePopup',
  props: ['showSocialPracticePopup'],
  data() {
    return {
      pickerColumn: [],
      yearColumn: ['2014','2015','2016','2017','2018','2019','2020'],
      termColumn: ['春季学期', '夏季学期','秋季学期'],
      socialPracticeContents: '',
      socialPracticeObj: {
        name: '',
        year: '',
        term: '',
      },
      socialPractices: [],
      showPicker: false,
    }
  },
  methods: {
    chooseSocialPracticeYear() {
      this.pickerColumn = this.yearColumn.concat();
      this.showPicker = true;
    },
    chooseSocialPracticeTerm() {
      this.pickerColumn = this.termColumn.concat();
      this.showPicker = true;
    },
    pickerConfirm(val) {
      if (isNaN(parseInt(val))) {
        this.socialPracticeObj.term = val;
      } else {
        this.socialPracticeObj.year = val;
      }
      this.showPicker = false;
    },
    pickerCancel() {
      this.showPicker = false;
    },
    async updateSocialPractice() {
      this.socialPracticeObj.name = this.socialPracticeContents;
      const res = await axios.post('/socialPractice/updateSocialPractices', {
        openId: localStorage.getItem('userID'),
        socialPractice: this.socialPracticeObj,
      });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.cancelUpdateSocialPractice();
        this.$emit('reloadSocialPractices');
      }
    },
    cancelUpdateSocialPractice() {
      this.socialPracticeObj = {
        year: '',
        term: '',
        name: ''
      };
      this.$emit('closeSocialPracticePopup');
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
