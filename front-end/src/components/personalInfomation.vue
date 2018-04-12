<template>
  <div>
    <div class="avatar-container">
      <img :src="wxUserInfo.avatarUrl" alt="avatar" class="avatar">
    </div>
    <div>
      <h2>{{basicInfo.name}}</h2>
      <div class="base-info-secondline">
        <h3>{{basicInfo.gender === '1' ? '男' : '女'}}</h3>
          <span>|</span>
        <h3>{{basicInfo.stuId}}</h3>
      </div>
    </div>
    <div>学生信息 <van-button size="small" type="default">小型按钮</van-button></div>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="基本信息" name="1">
        <van-cell-group>
          <van-cell title="姓名" :value="basicInfo.name" />
          <van-cell title="单元格" value="内容" />
        </van-cell-group>
      </van-collapse-item>
      <van-collapse-item title="个人信息" name="2">
      </van-collapse-item>
      <van-collapse-item title="家庭信息" name="3">
      </van-collapse-item>
      <van-collapse-item title="毕业信息" name="4">
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
      activeName: '1',
      wxUserInfo: '',
      basicInfo: '',
      personalInfo: '',
      familyInfo: '',
      graduateInfo: ''
    }
  },
  methods: {
    jump() {
      this.$router.push('/edit/basicInfo');
    }
  },
  async mounted() {
    if (!localStorage.getItem('userID')) {
      const value = this.$router.currentRoute.query.userID;
      localStorage.setItem('userID', value);
      const wxUserInfo = await axios.post('/login/getUserInfo', { value });
      this.wxUserInfo = wxUserInfo.data;
      return;
    }
    const value = localStorage.getItem('userID');
    const wxUserInfo = await axios.post('/login/getUserInfo', { value });
    this.wxUserInfo = wxUserInfo.data;
    const studentInfo = await axios.post('/info/studentInfo', { openId: value });
    if (!studentInfo.data.success) {
      this.$dialog.alert({
        message: '您还没有填写过基本信息,请前往填写',
      }).then(() => {
        this.$router.replace('/edit/basicInfo');
      })
    }
    this.basicInfo = studentInfo.data.studentInfo.basicInfo;
    this.personalInfo = studentInfo.data.studentInfo.personalInfo;
    this.familyInfo = studentInfo.data.studentInfo.familyInfo;
    this.graduateInfo = studentInfo.data.studentInfo.graduateInfo;
  }
}
</script>

<style>
.avatar-container {
  width: 25vw;
  height: 25vw;
  border-radius: 15vw;
  border: 1px solid #cccccc;
  position: relative;
  left: 50vw;
  transform: translateX(-12.5vw);
  background: white;
}
.avatar {
  display: inline-block;
  width: 23vw;
  height: 23vw;
  /* border: 1px solid #000; */
  border-radius: 10vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* .base-info-secondline {
  display: flex;
  justify-content: center;
} */
</style>
