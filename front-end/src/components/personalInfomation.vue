<template>
  <div style="padding: 10px;" v-loading="loadData">
    <div class="avatar-container">
      <img :src="wxUserInfo.avatarUrl" alt="avatar" class="avatar">
    </div>
    <div>
      <h2>{{basicInfo.name}}</h2>
      <div class="base-info-secondline">
        <h3>{{basicInfo.gender}}</h3>
          <span>|</span>
        <h3>{{basicInfo.stuId}}</h3>
      </div>
    </div>
    <el-button type="warning" style="margin-bottom: 20px">查看成绩单</el-button>
    <div class="title">
      <span>学生信息(资料完成度：{{Integrity}})</span>
      <div>
        <el-tag :type="infoStatus === '待审核'?'info':infoStatus === '审核通过'?'success':'danger'">{{infoStatus}}</el-tag>
        <van-button size="small" type="default" class="edit-btn" @click="toEditStudentInfo">编辑</van-button>
      </div>
    </div>
    <BasicInfo :personalInfo="personalInfo" :basicInfo="basicInfo" class="collapse"></BasicInfo>
    <div class="title">
      <span>学习成绩</span>
      <div>
        <el-tag :type="scoreStatus === '待审核'?'info':scoreStatus === '审核通过'?'success':'danger'">{{scoreStatus}}</el-tag>
        <van-button size="small" style="font-size: 14px" type="primary" @click="toAddScore">添加</van-button>
      </div>
    </div>
    <Score @toEditScore="toAddScore" class="collapse" :scores="scores"></Score>
    <div class="title">
      <span>德育表现</span>
      <div>
        <el-tag :type="secondClassStatus === '待审核'?'info':secondClassStatus === '审核通过'?'success':'danger'">{{secondClassStatus}}</el-tag>
        <van-button size="small" style="font-size: 14px" type="primary" @click="toAddSecondClass">添加</van-button>
      </div>
    </div>
    <SecondClass :secondClassInfo="secondClassInfo" @reloadSecondclass="reloadSecondclass"></SecondClass>
    <div class="title">
      <span>奖学金</span>
      <div>
        <el-tag :type="scholarshipStatus === '待审核'?'info':scholarshipStatus === '审核通过'?'success':'danger'">{{scholarshipStatus}}</el-tag>
        <van-button size="small" style="font-size: 14px" type="primary" @click="toAddScholarship">添加</van-button>
      </div>
    </div>
    <Scholarship :scholarships="scholarships" :scholarshipStatus="scholarshipStatus" @reloadScholarships="reloadScholarships"></Scholarship>
    <div class="title">
      <span>科技创新表现</span>
      <div>
        <el-tag :type="technologyStatus === '待审核'?'info':technologyStatus === '审核通过'?'success':'danger'">{{technologyStatus}}</el-tag>
        <van-button size="small" style="font-size: 14px" type="primary" @click="toAddTechnology">添加</van-button>
      </div>
    </div>
    <Technology :technologys="technologys" :technologyStatus="technologyStatus" @reloadTechnologys="reloadTechnologys"></Technology>
    <div class="title">
      <span>其他证书</span>
      <div>
        <el-tag :type="certificateStatus === '待审核'?'info':certificateStatus === '审核通过'?'success':'danger'">{{certificateStatus}}</el-tag>
        <van-button size="small" style="font-size: 14px" type="primary" @click="toAddCertificate">添加</van-button>
      </div>
    </div>
    <Certificate :certificates="certificates" :certificateStatus="certificateStatus" @reloadCertificates="reloadCertificates"></Certificate>
    <div class="title">
      <span>社会实践</span>
      <div>
        <el-tag :type="socialPracticeStatus === '待审核'?'info':socialPracticeStatus === '审核通过'?'success':'danger'">{{socialPracticeStatus}}</el-tag>
        <van-button size="small" style="font-size: 14px" type="primary" @click="toAddSocialPractice">添加</van-button>
      </div>
    </div>
    <social-practice :socialPractices="socialPractices" :socialPracticeStatus="socialPracticeStatus" @reloadSocialPractices="reloadSocialPractices"></social-practice>


    <van-popup
      v-model="showAddModel"
      position="right"
      style="width: 100vw;height: 100vh"
    >
      <div class="popup-header">{{popupTitle}}</div>
      <div class="cell-flex set-margin">
        <div>学年: {{score.gradeName.year}}</div>
        <van-button size="small" type="primary" @click="chooseYear">选择学年</van-button>
      </div>
      <div class="cell-flex set-margin">
        <div>学期: {{score.gradeName.term}}</div>
        <van-button size="small" type="primary" @click="chooseTerm">选择学期</van-button>
      </div>
      <van-cell-group>
        <van-field label="平均学分绩" v-model="score.score" placeholder="请输入学分绩"/>
      </van-cell-group>
      <div style="display: flex;justify-content: space-between;padding: 0 10px; margin-top: 6px" class="set-margin">
        <span>是否通过考试</span>
        <van-radio-group v-model="score.hasPass" @change="changeSelection" style="display: flex;justify-content: space-around">
          <van-radio style="margin-right: 10px" :name="0">通过</van-radio>
          <van-radio :name="1">不及格</van-radio>
        </van-radio-group>
      </div>
      <van-cell-group v-if="score.hasPass" class="set-margin">
        <van-field type="textarea" label="不及格科目" v-model="score.failingCourse" placeholder="学科之间请用英文逗号隔开"></van-field>
        <van-field type="textarea" label="挂科科目" v-model="score.failedCourse" placeholder="学科之间请用英文逗号隔开"></van-field>
      </van-cell-group>
      <van-row class="btn-position">
        <van-col span="12">
          <van-button v-if="popupTitle === '添加成绩'" bottom-action @click="addScore">添加</van-button>
          <van-button v-else bottom-action @click="addScore('edit')">提交</van-button>
        </van-col>
        <van-col span="12">
          <van-button type="primary" bottom-action @click="cancelAddScore">取消</van-button>
        </van-col>
      </van-row>
    </van-popup>
    <van-popup position="bottom" transition="popup-slide" style="width: 100vw;height: 30vh" v-model="showPicker">
      <van-picker :columns="pickerColumn" show-toolbar @confirm="pickerConfirm"></van-picker>
    </van-popup>

    <SecondClassPopup :addSceondClass="addSceondClass" :SelectOptions="SelectOptions" @closeSecondClassPopup="closeSecondClassPopup" @reloadSecondclass="reloadSecondclass"></SecondClassPopup>
    <ScholarshipPopup :showScholarshipPopup="showScholarshipPopup" @closeScholarshipPopup="closeScholarshipPopup" @reloadScholarships="reloadScholarships" :adminScholarships="adminScholarships"></ScholarshipPopup>
    <TechnologyPopup :showTechnologyPopup="showTechnologyPopup" @closeTechnologyPopup="closeTechnologyPopup" @reloadTechnologys="reloadTechnologys" :technologySelections="technologySelections"></TechnologyPopup>
    <CertificatePopup :showCertificatePopup="showCertificatePopup" @closeCertificatePopup="closeCertificatePopup" @reloadCertificates="reloadCertificates" :certificateSelections="adminCertificates"></CertificatePopup>
    <SocialPracticePopup :showSocialPracticePopup="showSocialPracticePopup" @closeSocialPracticePopup="closeSocialPracticePopup" @reloadSocialPractices="reloadSocialPractices"></SocialPracticePopup>
  </div>
</template>

<script>
import axios from 'axios';
import BasicInfo from './collapse/basicInfoCollapse';
import Score from './collapse/scoreCollapse';
import SecondClass from './collapse/secondClassCollapse';
import Scholarship from './collapse/scholarshipCollapse';
import ScholarshipPopup from './popup/scholarshipPopup';
import Technology from './collapse/technologyCollapse';
import TechnologyPopup from './popup/technologyPopup';
import Certificate from './collapse/certificateCollapse';
import CertificatePopup from './popup/certificatePopup';
import SocialPractice from './collapse/socialPracticeCollapse';
import SocialPracticePopup from './popup/socialPracticePopup';
import SecondClassPopup from './popup/secondClassPopup';

export default {
  name: 'PersonalInfomation',
  components: { BasicInfo, Score, SecondClass, Scholarship, ScholarshipPopup, Technology, TechnologyPopup, Certificate, CertificatePopup, SocialPractice, SocialPracticePopup, SecondClassPopup },
  data () {
    return {
      loadData: false,
      wxUserInfo: '',
      basicInfo: '',
      personalInfo: '',
      infoStatus: '',
      scoreStatus: '',
      secondClassStatus: '',
      Integrity: '0%',
      showAddModel: false,
      showPicker: false,
      pickerColumn: [],
      yearColumn: ['2014','2015','2016','2017','2018','2019','2020'],
      termColumn: ['春季学期', '夏季学期','秋季学期'],
      score: {
        status: '待审核',
        score: '',
        gradeName: {
          year: '',
          term: ''
        },
        hasPass: '',
        failingCourse: [],
        failedCourse: [],
      },
      scores: [],
      popupTitle: '添加成绩',
      SelectOptions: {
        positions: [],
        activities: [],
        honor: [],
        dorm: [],
        decrease: [],
      },
      addSceondClass: false,
      selected: {
        position: [],
        activities: [],
        honor: [],
        dorm: [],
        decrease: [],
      },
      secondClassInfo: '',
      scholarshipStatus: '',
      scholarships: {},
      showScholarshipPopup: false,
      adminScholarships: [],
      technologyStatus: '',
      technologys: {},
      technologySelections: [],
      showTechnologyPopup: false,
      certificates: {},
      certificateStatus: '',
      adminCertificates: [],
      showCertificatePopup: false,
      socialPracticeStatus: '',
      socialPractices: {},
      showSocialPracticePopup: false,
    }
  },
  methods: {
    toEditStudentInfo() {
      this.$router.push('/edit/basicInfo');
    },
    calDataIntegrity(infoObj) {
      let filled = 0;
      let unfilled = 0;
      for (const key in infoObj) {
        if (key === 'openId') {
          continue;
        }
        if (infoObj[key]) {
          for (const innerKey in infoObj[key]) {
            if (infoObj[key][innerKey]) {
              filled++;
            } else {
              unfilled++;
            }
          }
        }
      }
      return (filled/(filled+unfilled)*100).toFixed(1)+'%';
    },
    toAddScore(score) {
      if (score.gradeName) {
        this.popupTitle = '编辑成绩';
        this.score = score;
        this.score.hasPass = this.score.hasPass ? 0 : 1;
        if(this.score.failingCourse.length > 0) {
          this.score.failingCourse = this.score.failingCourse.join(',');
        }
        if(this.score.failedCourse.length > 0) {
          this.score.failedCourse = this.score.failedCourse.join(',');
        }
      } else {
        this.popupTitle = '添加成绩';
      }
      this.showAddModel = true;
    },
    async addScore(edit) {
      this.score.openId = localStorage.getItem('userID');
      this.score.hasPass = this.score.hasPass === 1?false:true;
      if (!this.score.hasPass) {
        if (this.score.failingCourse && typeof this.score.failingCourse === 'string') {
          this.score.failingCourse = this.score.failingCourse.split(',');
        }
        if (this.score.failedCourse && typeof this.score.failedCourse === 'string') {
          this.score.failedCourse = this.score.failedCourse.split(',');
        }
      }
      if (edit === 'edit') {
        const res = await axios.post('/score/updateScore', { score: this.score });
        if (res.data.message === 'ok') {
          this.$toast.success('添加成功');
        } else {
          this.$toast.fail('添加失败');
        }
      } else {
        const res = await axios.post('/score/addScore', { score: this.score });
        if (res.data.message === 'ok') {
          this.$toast.success('添加成功');
        } else {
          this.$toast.fail('添加失败');
        }
      }
      this.score = {
        score: '',
        gradeName: {
          year: '',
          term: ''
        },
        hasPass: '',
        failingCourse: [],
        failedCourse: [],
      };
      this.showAddModel = false;
      await this.getAllScores();
    },
    cancelAddScore() {
      this.score = {
        score: '',
        gradeName: {
          year: '',
          term: ''
        },
        hasPass: '',
        failingCourse: [],
        failedCourse: [],
      }
      this.showAddModel = false;
    },
    changeSelection() {
    },
    chooseYear() {
      this.pickerColumn = this.yearColumn.concat();
      this.showPicker = true;
    },
    chooseTerm() {
      this.pickerColumn = this.termColumn.concat();
      this.showPicker = true;
    },
    pickerConfirm(value) {
      if (isNaN(parseInt(value))) {
        this.score.gradeName.term = value;
      } else {
        this.score.gradeName.year = value;
      }
      this.showPicker = false;
    },
    async getAllScores() {
      const scores = await axios.post('/score/getAllScores', { openId: localStorage.getItem('userID') });
      this.scores = scores.data.scores;
      if (this.scores.length === 0) {
        this.scoreStatus = '待填写';
      } else {
        this.scoreStatus = this.scores[0].status;
      }
    },
    toAddSecondClass() {
      const { position, activities, dorm, honor, decrease } = this.secondClassInfo;
      this.selected = { position, activities, dorm, honor, decrease }
      this.addSceondClass = true;
    },
    async reloadSecondclass() {
      const res = await axios.post('/position/getAllSecondclassInfo', { openId: localStorage.getItem('userID') });
      if (res.data.message === 'ok') {
        if (res.data.res.length === 0) {
          this.secondClassStatus = '待填写';
          this.secondClassInfo = {
            position: [],
            activities: [],
            honor: [],
            dorm: [],
            decrease: [],
          }
        } else {
          this.secondClassStatus = res.data.res[0].status;
          this.secondClassInfo = res.data.res[0];
        }
      }
    },
    closeSecondClassPopup() {
      this.addSceondClass = false;
    },
    toAddScholarship() {
      this.showScholarshipPopup = true;
    },
    closeScholarshipPopup() {
      this.showScholarshipPopup = false;
    },
    async reloadScholarships() {
      const res = await axios.post('/scholarship/getAllScholarships', { openId: localStorage.getItem('userID') });
      if (res.data.message === 'ok') {
        if (res.data.scholarships[0].scholarships.length === 0) {
          this.scholarshipStatus = '待填写';
          this.scholarships.scholarships = [];
        } else {
          this.scholarships = res.data.scholarships[0];
          this.scholarshipStatus = res.data.scholarships[0].status;
        }
      }
    },
    toAddTechnology() {
      this.showTechnologyPopup = true;
    },
    closeTechnologyPopup() {
      this.showTechnologyPopup = false;
    },
    async reloadTechnologys() {
      const res = await axios.post('/technology/getAllTechnologys', { openId: localStorage.getItem('userID') });
      if (res.data.message === 'ok') {
        if (res.data.technology === null || res.data.technology.technologys.length === 0) {
          this.technologyStatus = '待填写';
          this.technologys.technologys = [];
        } else {
          this.technologys = res.data.technology;
          this.technologyStatus = res.data.technology.status;
        }
      }
    },
    toAddCertificate() {
      this.showCertificatePopup = true;
    },
    closeCertificatePopup() {
      this.showCertificatePopup = false;
    },
    async reloadCertificates() {
      const res = await axios.post('/certificate/getAllCertificates', { openId: localStorage.getItem('userID') });
      if (res.data.message === 'ok') {
        if (res.data.certificate === null || res.data.certificate.certificates.length === 0) {
          this.certificateStatus = '待填写';
          this.certificates.certificates = [];
        } else {
          this.certificates = res.data.certificate;
          this.certificateStatus = res.data.certificate.status;
        }
      }
    },
    toAddSocialPractice() {
      this.showSocialPracticePopup = true;
    },
    closeSocialPracticePopup() {
      this.showSocialPracticePopup = false;
    },
    async reloadSocialPractices() {
      const res = await axios.post('/socialPractice/getAllSocialPractices', { openId: localStorage.getItem('userID') });
      if (res.data.message === 'ok') {
        if (res.data.socialPractice === null || res.data.socialPractice.socialPractices.length === 0) {
          this.socialPracticeStatus = '待填写';
          this.socialPractices.socialPractices = [];
        } else {
          this.socialPractices = res.data.socialPractice;
          this.socialPracticeStatus = res.data.socialPractice.status;
        }
      }
    }
  },
  async created() {
    if (!localStorage.getItem('userID')) {
      const value = this.$router.currentRoute.query.userID;
      localStorage.setItem('userID', value);
      const wxUserInfo = await axios.post('/login/getUserInfo', { value });
      this.wxUserInfo = wxUserInfo.data[0];
      this.$dialog.alert({
        message: '您还没有填写过基本信息,请前往填写',
      }).then(() => {
        this.$router.replace('/edit/basicInfo');
      })
      return;
    }
    this.loadData = true;
    const value = localStorage.getItem('userID');
    const wxUserInfo = await axios.post('/login/getUserInfo', { value });
    this.wxUserInfo = wxUserInfo.data[0];
    const studentInfo = await axios.post('/info/studentInfo', { openId: value });
    if (!studentInfo.data.success) {
      this.$dialog.alert({
        message: '您还没有填写过基本信息,请前往填写',
      }).then(() => {
        this.$router.replace('/edit/basicInfo');
      })
      return;
    }
    this.infoStatus = studentInfo.data.studentInfo[0].status;
    this.basicInfo = studentInfo.data.studentInfo[0].basicInfo;
    this.personalInfo = studentInfo.data.studentInfo[0].personalInfo;
    const objToCal = { basicInfo: this.basicInfo, personalInfo: this.personalInfo };
    this.Integrity = this.calDataIntegrity(objToCal);
    await this.getAllScores();
    const positions = await axios.get('/position/getAllPositions');
    this.SelectOptions = positions.data;
    await this.reloadSecondclass();
    const scholarships = await axios.get('/admin/scholarship/getAllScholarships');
    this.adminScholarships = scholarships.data.scholarships;
    await this.reloadScholarships();
    this.technologySelections = positions.data.tech;
    await this.reloadTechnologys();
    const certificates = await axios.get('/admin/certificate/getAllCertificates');
    this.adminCertificates = certificates.data.certificates;
    await this.reloadCertificates();
    await this.reloadSocialPractices();
    this.loadData = false;
  }
}
</script>

<style scoped>
h3 {
  line-height: 30px;
  margin-top: 0;
  display: inline-block;
}
.avatar-container {
  width: 25vw;
  height: 25vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background: white;
}
.avatar {
  display: inline-block;
  width: 25vw;
  height: 25vw;
  border-radius: 12.5vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  display: flex;
  justify-content: space-between;
}
.van-button--default {
  background-color: rgb(255, 115, 0);
  color: white;
  font-size: 14px;
}
.base-info-secondline {
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
}
.collapse {
  margin-bottom: 10px;
}
.cell-flex {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}
.van-dialog__header {
  padding: 10px 0;
}
.popup-header {
  font-size: 1.5625rem;
  padding: 10px;
  letter-spacing: 5px;
}
.set-margin {
  margin-bottom: 15px;
}
.van-cell {
  font-size: 1rem;
  padding: 10px 5px;
}
.van-cell__text {
  font-size: 20px;
}
.flex-selector {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0 .3125rem;
}
.btn-position {
  margin-top: 20px;
}
</style>
