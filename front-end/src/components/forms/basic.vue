<template>
  <van-cell-group>
    <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
    <van-radio-group v-model="gender">
      <van-cell-group>
        <van-cell>
          <div class="van-cell__title label">
            <span class="van-cell__text">性别</span>
          </div>
          <van-radio name="1" class="radio">男</van-radio>
          <van-radio name="0" class="radio">女</van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-field v-model="stuId" label="学号" placeholder="请输入学号" />
    <van-field v-model="major" label="专业" placeholder="请输入专业" />
    <van-field v-model="volk" label="民族" placeholder="请输入民族" />
    <van-field v-model="nativePlace" label="籍贯" placeholder="请输入籍贯" />
    <van-field v-model="dormId" label="寝室号" placeholder="请输入寝室号" />
    <van-field v-model="enrolment" label="入学方式" placeholder="请输入入学方式" />
    <van-radio-group v-model="NDstudent">
      <van-cell-group>
        <van-cell>
          <div class="van-cell__title label">
            <span class="van-cell__text">国防生</span>
          </div>
          <van-radio name="1" class="radio">是</van-radio>
          <van-radio name="0" class="radio">否</van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-radio-group v-model="partyMember">
      <van-cell-group>
        <van-cell>
          <div class="van-cell__title label">
            <span class="van-cell__text">党员</span>
          </div>
          <van-radio name="1" class="radio">是</van-radio>
          <van-radio name="0" class="radio">否</van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </van-cell-group>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      gender: '',
      stuId: '',
      major: '',
      volk: '',
      nativePlace: '',
      dormId: '',
      enrolment: '',
      NDstudent: '',
      partyMember: ''
    }
  }
}
</script>

<style>
.van-cell__value--alone {
  display: flex;
}
.label {
  align-self: center;
}
.van-cell__title {
  min-width: 90px;
  display: inline-block;
  text-align: center;
  /* line-height: 32px; */
}
.radio {
  display: inline-block;
  padding: 0 5px;
}
</style>
