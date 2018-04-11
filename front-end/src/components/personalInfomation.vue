<template>
  <div>
    <div class="avatar-background"></div>
    <div class="avatar-container">
      <img src="../assets/logo.png" alt="avatar" class="avatar">
    </div>
    <div class="basic-info">
      <button @click="jump">123</button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInfomation',
  data () {
    return {
    }
  },
  methods: {
    jump() {
      this.$router.push('edit');
    }
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
