<template>
  <div>
    <van-steps :active="active">
      <van-step>基本信息</van-step>
      <van-step>个人信息</van-step>
      <van-step>家庭信息</van-step>
      <van-step>毕业信息</van-step>
    </van-steps>
    <router-view></router-view>
    <div class="buttons">
      <van-button type="default" @click="lastStep" :disabled="lastStepDisable">上一步</van-button>
      <van-button type="primary" @click="save">保存</van-button>
      <van-button type="default" @click="nextStep" :disabled="nextStepDisable">下一步</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastStepDisable: false,
      nextStepDisable: false,
      lastRouter: '',
      nextRouter: '',
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
      this.$router.push(this.lastRouter);
    },
    nextStep() {
      this.$store.commit('stepForward')
      this.$router.push(this.nextRouter);
    },
    save() {
      
    },
    handleRouter(val) {
      if (val === 3) {
        this.nextStepDisable = true;
        this.nextRouter = this.$store.state.routerList[val];
        this.lastRouter = this.$store.state.routerList[val-1];
      } else if (val === 0) {
        this.lastStepDisable = true;
        this.lastRouter = this.$store.state.routerList[val];
        this.nextRouter = this.$store.state.routerList[val+1];
      } else {
        this.lastRouter = this.$store.state.routerList[val-1];
        this.nextRouter = this.$store.state.routerList[val+1];
        this.lastStepDisable = false;
        this.nextStepDisable = false;
      }
    }
  },
  mounted() {
    const val = this.$store.state.form_step;
    this.handleRouter(val);
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
