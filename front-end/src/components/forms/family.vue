<template>
  <div>
    <div class="cell-title">父亲信息</div>
    <van-cell-group>
      <van-field v-model="fatherName" placeholder="请输入姓名" label="姓名" />
      <van-field v-model="fatherWorkPlace" placeholder="请输入工作单位" label="工作单位" />
      <van-field v-model="fatherPhoneNumber" placeholder="请输入手机号" label="手机号" />
    </van-cell-group>
    <div class="cell-title">母亲信息</div>
    <van-cell-group>
      <van-field v-model="motherName" placeholder="请输入姓名" label="姓名" />
      <van-field v-model="motherWorkPlace" placeholder="请输入工作单位" label="工作单位" />
      <van-field v-model="motherPhoneNumber" placeholder="请输入手机号" label="手机号" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fatherName: '',
      fatherWorkPlace: '',
      fatherPhoneNumber: '',
      motherName: '',
      motherWorkPlace: '',
      motherPhoneNumber: '',
    }
  },
  mounted() {
    const form = JSON.parse(localStorage.getItem('family'));
    if (form) {
      this.fatherName = form.fatherName;
      this.fatherWorkPlace = form.fatherWorkPlace;
      this.fatherPhoneNumber = form.fatherPhoneNumber;
      this.motherName = form.motherName;
      this.motherWorkPlace = form.motherWorkPlace;
      this.motherPhoneNumber = form.motherPhoneNumber;
    }
  }
}
</script>

<style scoped>
.cell-title {
  text-align: left;
  color: #999999;
  padding: 6px 25px;
}
</style>
