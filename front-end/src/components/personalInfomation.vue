<template>
  <div style="padding: 10px;">
    <div class="avatar-container">
      <img :src="wxUserInfo.avatarUrl" alt="avatar" class="avatar">
    </div>
    <div>
      <h2>{{basicInfo.name}}</h2>
      <div class="base-info-secondline">
        <h3>{{basicInfo.gender}}</h3>
          <span>|</span>
        <h3>{{basicInfo.stuId}}</h3>
      </div>
    </div>
    <div class="title">
      <span>学生信息(资料完成度：{{Integrity}})</span>
      <van-button size="small" type="default" class="edit-btn" @click="toEditStudentInfo">编辑</van-button>
    </div>
    <BasicInfo :personalInfo="personalInfo" :basicInfo="basicInfo" class="collapse"></BasicInfo>
    <div class="title">
      <span>学习成绩</span>
      <van-button size="small" style="font-size: 14px" type="primary" @click="toAddScore">添加</van-button>
    </div>
    <Score class="collapse" :scores="scores"></Score>
    <van-dialog
      v-model="showAddModel"
      show-cancel-button
      @confirm="addModelConfirmed"
      @cancel="addModelCanceled"
      title="添加成绩"
    >
      <div class="cell-flex">
        <div>学年</div>
        <van-button size="small" type="primary">选择学年</van-button>
      </div>
      <div class="cell-flex">
        <div>学期</div>
        <van-button size="small" type="primary">选择学期</van-button>
      </div>
      <div style="display: flex;justify-content: space-around">
        <span>是否通过考试</span>
        <van-radio-group v-model="score.hasPass" @change="changeSelection" style="display: flex;justify-content: space-around">
          <van-radio :name="0">通过</van-radio>
          <van-radio :name="1">不及格</van-radio>
        </van-radio-group>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import BasicInfo from './collapse/basicInfoCollapse';
import Score from './collapse/scoreCollapse';
export default {
  name: 'PersonalInfomation',
  components: { BasicInfo, Score },
  data () {
    return {
      wxUserInfo: '',
      basicInfo: '',
      personalInfo: '',
      Integrity: '0%',
      showAddModel: false,
      score: {
        score: '',
        gradeName: {
          year: '',
          term: ''
        },
        hasPass: '',
        failingCourse: [],
        failedCourse: [],
      },
      scores: []
    }
  },
  methods: {
    toEditStudentInfo() {
      this.$router.push('/edit/basicInfo');
    },
    calDataIntegrity(infoObj) {
      let filled = 0;
      let unfilled = 0;
      for (const key in infoObj) {
        if (key === 'openId') {
          continue;
        }
        if (infoObj[key]) {
          for (const innerKey in infoObj[key]) {
            if (infoObj[key][innerKey]) {
              filled++;
            } else {
              unfilled++;
            }
          }
        }
      }
      return (filled/(filled+unfilled)*100).toFixed(1)+'%';
    },
    toAddScore() {
      this.showAddModel = true;
    },
    async addModelConfirmed() {
      this.score.openId = localStorage.getItem('userID');
      const res = await axios.post('/score/addScore', this.score);
      if (res.data.message === 'ok') {
        this.$toast.success('添加成功');
      } else {
        this.$toast.fail('添加失败');
      }
    },
    addModelCanceled() {
      this.score = {
        score: '',
        gradeName: {
          year: '',
          term: ''
        },
        hasPass: '',
        failingCourse: [],
        failedCourse: [],
      }
    },
    changeSelection() {
      console.log(this.score.hasPass);
    }
  },
  async created() {
    if (!localStorage.getItem('userID')) {
      const value = this.$router.currentRoute.query.userID;
      localStorage.setItem('userID', value);
      const wxUserInfo = await axios.post('/login/getUserInfo', { value });
      console.log(wxUserInfo);
      this.wxUserInfo = wxUserInfo.data[0];
      this.$dialog.alert({
        message: '您还没有填写过基本信息,请前往填写',
      }).then(() => {
        this.$router.replace('/edit/basicInfo');
      })
      return;
    }
    const value = localStorage.getItem('userID');
    const wxUserInfo = await axios.post('/login/getUserInfo', { value });
    this.wxUserInfo = wxUserInfo.data[0];
    const studentInfo = await axios.post('/info/studentInfo', { openId: value });
    if (!studentInfo.data.success) {
      this.$dialog.alert({
        message: '您还没有填写过基本信息,请前往填写',
      }).then(() => {
        this.$router.replace('/edit/basicInfo');
      })
      return;
    }
    this.basicInfo = studentInfo.data.studentInfo[0].basicInfo;
    this.personalInfo = studentInfo.data.studentInfo[0].personalInfo;
    const objToCal = { basicInfo: this.basicInfo, personalInfo: this.personalInfo };
    this.Integrity = this.calDataIntegrity(objToCal);
  }
}
</script>

<style scoped>
h3 {
  line-height: 30px;
  margin-top: 0;
  display: inline-block;
}
.avatar-container {
  width: 25vw;
  height: 25vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background: white;
}
.avatar {
  display: inline-block;
  width: 25vw;
  height: 25vw;
  border-radius: 12.5vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  display: flex;
  justify-content: space-between;
}
.van-button--default {
  background-color: rgb(255, 115, 0);
  color: white;
  font-size: 14px;
}
.base-info-secondline {
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
}
.collapse {
  margin-bottom: 10px;
}
.cell-flex {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}
.van-dialog__header {
  padding: 10px 0;
}
</style>
