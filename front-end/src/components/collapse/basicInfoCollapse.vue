<template>
  <van-collapse v-model="activeName" accordion>
    <van-collapse-item title="基本信息" name="1">
      <van-cell-group>
        <van-cell title="专业" :value="basicInfo.major" />
        <van-cell title="班级" :value="basicInfo.className" />
        <van-cell title="手机号" :value="basicInfo.phoneNumber" />
        <van-cell title="微信号" :value="basicInfo.wx" />
        <!-- <van-cell title="少数民族" :value="basicInfo.minority" />
        <van-cell title="民族" :value="basicInfo.volk" />
        <van-cell title="生日" :value="basicInfo.birthday" />
        <van-cell title="籍贯" :value="basicInfo.nativePlace" />
        <van-cell title="寝室号" :value="basicInfo.dormId" />
        <van-cell title="入学方式" :value="basicInfo.enrolment" />
        <van-cell title="国防生" :value="basicInfo.NDstudent" />
        <van-cell title="党员" :value="basicInfo.partyMember" /> -->
      </van-cell-group>
    </van-collapse-item>
    <!-- <van-collapse-item title="个人信息" name="2">
      <van-cell-group>
        <van-cell title="QQ" :value="personalInfo.QQ" />
        <van-cell title="电子邮箱" :value="personalInfo.EMail" />
        <van-cell title="微信号" :value="personalInfo.wx" />
        <van-cell title="家庭住址" :value="personalInfo.familyAddress" />
      </van-cell-group>
    </van-collapse-item> -->
  </van-collapse>
</template>

<script>
export default {
  props: [ 'basicInfo' ],
  data() {
    return {
      activeName: '0'
    }
  }
}
</script>

<style>

</style>
