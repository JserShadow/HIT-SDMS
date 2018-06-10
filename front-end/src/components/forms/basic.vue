<template>
  <van-cell-group>
    <van-field v-model="name" label="姓名" placeholder="请输入姓名" required/>
    <van-radio-group v-model="gender">
      <van-cell-group>
        <van-cell class="required">
          <div class="van-cell__title label">
            <span class="van-cell__text">性别</span>
          </div>
          <van-radio name="男" class="radio">男</van-radio>
          <van-radio name="女" class="radio">女</van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-field v-model="stuId" label="学号" placeholder="请输入学号" required/>
    <van-cell title="专业" @click="pickMajor" style="padding: 10px 40px" :value="major">
      <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
    </van-cell>
    <van-field v-model="className" label="班级" placeholder="请输入班级" />
    <van-field v-model="phoneNumber" placeholder="请输入手机号" label="手机号" />
    <van-field v-model="wx" placeholder="请输入微信号" label="微信号" />
    <van-cell title="生日" @click="pickBirthday" style="padding: 10px 40px" :value="birthday">
      <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
    </van-cell>
    <van-field v-model="volk" label="民族" placeholder="请输入民族" />
    <van-field v-model="nativePlace" label="籍贯" placeholder="请输入籍贯" />
    <van-cell title="政治面貌" @click="pickParty" style="padding: 10px 40px" :value="partyMember">
      <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
    </van-cell>
    <van-popup v-model="birthdayPicker" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="getBirthday"
        @cancel="cancelPickBirthday"
      />
    </van-popup>
    <van-popup v-model="majorPicker" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="majors" @confirm="getMajor" @cancel="cancelPickMajor" />
    </van-popup>
    <van-popup v-model="partyPicker" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="partys" @confirm="getParty" @cancel="cancelPickParty" />
    </van-popup>
    <!-- <van-field v-model="birthday" label="生日" placeholder="如：1997-06-13" /> -->
    <!-- <van-radio-group v-model="minority">
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
    </van-radio-group> -->
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
      className: '',
      phoneNumber: '',
      wx: '',
      birthday: '',
      // minority: '',
      volk: '',
      nativePlace: '',
      // dormId: '',
      // enrolment: '',
      // NDstudent: '',
      partyMember: '',
      birthdayPicker: false,
      majorPicker: false,
      currentDate: '',
      minDate: new Date(1989,12,1),
      maxDate: new Date(2000,11,31),
      majors: ['自动化','探测制导与控制技术','飞行器设计与工程','飞行器环境与生命保障工程','空间科学与技术','工程力学','复合材料科学与工程','电子科学与技术','电子信息科学与技术','光电信息科学与工程（光学工程方向）','自动化类','工科试验班','电子信息类'],
      partyPicker: false,
      partys: [ '群众', '共青团员', '中共党员', '预备党员' ],
    }
  },
  methods: {
    pickBirthday() {
      this.birthdayPicker = true;
    },
    getBirthday(val) {
      const birthday = `${val.getFullYear()}-${val.getMonth() < 10?'0'+(val.getMonth()+1):(val.getMonth()+1)}-${val.getDate() < 10?'0'+val.getDate():val.getDate()}`;
      this.birthday = birthday;
      this.birthdayPicker = false;
    },
    cancelPickBirthday() {
      this.birthdayPicker = false;
    },
    pickMajor() {
      this.majorPicker = true;
    },
    getMajor(val) {
      this.major = val;
      this.majorPicker = false;
    },
    cancelPickMajor() {
      this.majorPicker = false;
    },
    pickParty() {
      this.partyPicker = true;
    },
    getParty(val) {
      this.partyMember = val;
      this.partyPicker = false;
    },
    cancelPickParty() {
      this.partyPicker = false;
    },
  },
  mounted() {
      const form = JSON.parse(localStorage.getItem('basic'));
      if (form) {
        this.name = form.name;
        this.gender = form.gender;
        this.stuId = form.stuId;
        this.major = form.major;
        this.className = form.className;
        this.phoneNumber = form.phoneNumber;
        this.wx = form.wx;
        this.birthday = form.birthday;
        // this.minority = form.minority;
        this.volk = form.volk;
        this.nativePlace = form.nativePlace;
        // this.dormId = form.dormId;
        // this.enrolment = form.enrolment;
        // this.NDstudent = form.NDstudent;
        this.partyMember = form.partyMember;
      }
  }
}
</script>

<style scoped>
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
  line-height: 32px;
}
.radio {
  display: inline-block;
  padding: 0 5px;
}
.required::before {
  content: '*';
  position: absolute;
  left: 7px;
  padding-left: inherit;
  font-size: 14px;
  color: #f44;
}
.van-cell--required::before {
  padding-left: inherit;
}
</style>
