<template>
  <div>
    <div id="step" style="text-align: left;">
      <van-steps :active="active">
        <van-step>基本信息</van-step>
        <van-step>个人信息</van-step>
      </van-steps>
    </div>
    <router-view ref="form"></router-view>
    <div class="buttons">
      <van-button type="default" @click="lastStep" :disabled="lastStepDisable">上一步</van-button>
      <van-button type="default" @click="nextStep" v-if="!nextStepDisable">下一步</van-button>
      <van-button type="primary" @click="save" v-else>保存</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      lastStepDisable: false,
      nextStepDisable: false,
      lastRouter: '',
      nextRouter: '',
      routerName: '',
      openId: ''
    }
  },
  computed: {
    active() {
      return this.$store.state.form_step;
    }
  },
  watch: {
    active(val) {
      this.handleRouter(val);
    }
  },
  methods: {
    lastStep() {
      this.$store.commit('stepBack');
      this.$router.replace(this.lastRouter);
    },
    nextStep() {
      const step = this.$store.state.form_step;
      const data = this.$refs.form.$data;
      console.log(data);
      if (step === 0 ) {
        if (data.name === '' || data.gender === '' || data.stuId === '') {
          
          this.$toast({
            type: 'fail',
            message: '重要数据不能为空',
            duration: 2000
          })
          return;
        }
      }
      this.$store.commit('stepForward')
      this.$router.replace(this.nextRouter);
    },
    async save() {
      await this.saveData();
      this.$store.commit('setFormStep');
      this.$router.replace('/')
    },
    handleRouter(val) {
      console.log(val);
      if (val === 1) {
        this.nextStepDisable = true;
        this.lastStepDisable = false;
        this.nextRouter = this.$store.state.routerList[val];
        this.lastRouter = this.$store.state.routerList[0];
      } else if (val === 0) {
        this.lastStepDisable = true;
        this.nextStepDisable = false;
        this.lastRouter = this.$store.state.routerList[val];
        this.nextRouter = this.$store.state.routerList[1];
      }
    },
    async saveData() {
      const { phoneNumber, QQ, EMail, wx, familyAddress } = this.$refs.form.$data;
      const basicInfo = JSON.parse(localStorage.getItem('basic'));
      const personalInfo = { phoneNumber, QQ, EMail, wx, familyAddress }
      localStorage.setItem('personal',JSON.stringify(personalInfo));
      const stuInfo = { openId: this.openId, status: '待审核',  basicInfo, personalInfo };
      console.log(stuInfo);
      try {
        console.log('trying');
        await axios.post('/submit/studentInfo', stuInfo);
      } catch (error) {
        console.log(error);
        this.$toast({
          type: 'fail',
          duation: 2000,
          message: '保存失败,请稍后重试'
        });
      }
      this.$toast({
        type: 'success',
        duation: 2000,
        message: '保存成功'
      })
    }
  },
  mounted() {
    const val = this.$store.state.form_step;
    this.handleRouter(val);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.openId = localStorage.getItem('userID');
    });
  },
  beforeRouteUpdate(to, from, next) {
    localStorage.setItem(from.name, JSON.stringify(this.$refs.form.$data));
    next();
  },
}
</script>

<style scoped>
.buttons {
  margin: 10px 0px;
  display: flex;
  justify-content: space-around;
}
</style>
