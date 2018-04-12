<template>
  <van-cell-group>
    <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
    <van-radio-group v-model="gender">
      <van-cell-group>
        <van-cell>
          <div class="van-cell__title label">
            <span class="van-cell__text">性别</span>
          </div>
          <van-radio name="男" class="radio">男</van-radio>
          <van-radio name="女" class="radio">女</van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-field v-model="stuId" label="学号" placeholder="请输入学号" />
    <van-field v-model="major" label="专业" placeholder="请输入专业" />
    <van-field v-model="birthday" label="生日" placeholder="如：1997-06-13" />
    <van-radio-group v-model="minority">
      <van-cell-group>
        <van-cell>
          <div class="van-cell__title label">
            <span class="van-cell__text">少数民族</span>
          </div>
          <van-radio name="是" class="radio">是</van-radio>
          <van-radio name="否" class="radio">否</van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
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
          <van-radio name="是" class="radio">是</van-radio>
          <van-radio name="否" class="radio">否</van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-radio-group v-model="partyMember">
      <van-cell-group>
        <van-cell>
          <div class="van-cell__title label">
            <span class="van-cell__text">党员</span>
          </div>
          <van-radio name="是" class="radio">是</van-radio>
          <van-radio name="否" class="radio">否</van-radio>
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
      birthday: '',
      minority: '',
      volk: '',
      nativePlace: '',
      dormId: '',
      enrolment: '',
      NDstudent: '',
      partyMember: ''
    }
  },
  mounted() {
      const form = JSON.parse(localStorage.getItem('basic'));
      if (form) {
        this.name = form.name;
        this.gender = form.gender;
        this.stuId = form.stuId;
        this.major = form.major;
        this.birthday = form.birthday;
        this.minority = form.minority;
        this.volk = form.volk;
        this.nativePlace = form.nativePlace;
        this.dormId = form.dormId;
        this.enrolment = form.enrolment;
        this.NDstudent = form.NDstudent;
        this.partyMember = form.partyMember;
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
