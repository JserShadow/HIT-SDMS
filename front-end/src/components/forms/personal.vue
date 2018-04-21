<template>
  <van-cell-group>
    <van-field v-model="phoneNumber" placeholder="请输入手机号" label="手机号" />
    <van-field v-model="QQ" placeholder="请输入QQ" label="QQ" />
    <van-field v-model="EMail" placeholder="请输入电子邮箱" label="电子邮箱"/>
    <van-field v-model="wx" placeholder="请输入微信号" label="微信号" />
    <van-field v-model="familyAddress" placeholder="请输入家庭住址" label="家庭住址"  type="textarea"/>
  </van-cell-group>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
      QQ: '',
      EMail: '',
      wx: '',
      familyAddress: '',
    }
  },
  mounted() {
    const form = JSON.parse(localStorage.getItem('personal'));
    if (form) {
      this.phoneNumber = form.phoneNumber;
      this.QQ = form.QQ;
      this.EMail = form.EMail;
      this.wx = form.wx;
      this.familyAddress = form.familyAddress;
    }
  }
}
</script>

<style>

</style>
