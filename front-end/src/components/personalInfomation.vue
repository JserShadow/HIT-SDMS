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
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="基本信息" name="1">
        <van-cell-group>
          <van-cell title="专业" :value="basicInfo.major" />
          <van-cell title="班级" :value="basicInfo.className" />
          <van-cell title="少数民族" :value="basicInfo.minority" />
          <van-cell title="民族" :value="basicInfo.volk" />
          <van-cell title="生日" :value="basicInfo.birthday" />
          <van-cell title="籍贯" :value="basicInfo.nativePlace" />
          <van-cell title="寝室号" :value="basicInfo.dormId" />
          <van-cell title="入学方式" :value="basicInfo.enrolment" />
          <van-cell title="国防生" :value="basicInfo.NDstudent" />
          <van-cell title="党员" :value="basicInfo.partyMember" />
        </van-cell-group>
      </van-collapse-item>
      <van-collapse-item title="个人信息" name="2">
        <van-cell-group>
          <van-cell title="手机号" :value="personalInfo.phoneNumber" />
          <van-cell title="QQ" :value="personalInfo.QQ" />
          <van-cell title="电子邮箱" :value="personalInfo.EMail" />
          <van-cell title="微信号" :value="personalInfo.wx" />
          <van-cell title="家庭住址" :value="personalInfo.familyAddress" />
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'PersonalInfomation',
  data () {
    return {
      activeName: '0',
      wxUserInfo: '',
      basicInfo: '',
      personalInfo: '',
      Integrity: '0%'
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
</style>
