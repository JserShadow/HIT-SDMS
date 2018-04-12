<template>
  <div>
    <div class="avatar-background"></div>
    <div class="avatar-container">
      <img :src="wxUserInfo.avatarUrl" alt="avatar" class="avatar">
    </div>
    <div class="nick-name">{{ wxUserInfo.nickName }}</div>
    <div class="basic-info">
      <button @click="jump">123</button>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'PersonalInfomation',
  data () {
    return {
      wxUserInfo: '',
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
  }
}
</script>

<style>
.avatar-background {
  width: 100%;
  height: 40vw;
  background-color: rgb(0, 140, 255);
}
.avatar-container {
  width: 25vw;
  height: 25vw;
  border-radius: 15vw;
  border: 1px solid #cccccc;
  position: relative;
  top: -12.5vw;
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
</style>
