<template>
  <van-popup v-model="addSceondClass" position="right" :overlay="false" style="height:100vh;width: 100vw;overflow-y: scroll">
    <div class="popup-header">添加第二课堂表现</div>
    <div class="cell-flex set-margin">
      <span>选择类别: </span>
      <el-select v-model="catagory" placeholder="请选择" size="small" @change="changeCatagory">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
    </div>
    <div v-if="selectorInfo.length">
      <div class="cell-flex set-margin">
        <div>学年: {{secondClassObj.year}}</div>
        <van-button size="small" type="primary" @click="chooseSecondClassYear">选择学年</van-button>
      </div>
      <div class="cell-flex set-margin">
        <div>学期: {{secondClassObj.term}}</div>
        <van-button size="small" type="primary" @click="chooseSecondClassTerm">选择学期</van-button>
      </div>
      <div class="cell-flex set-margin">
        <span>选择内容类别: </span>
        <el-select v-model="secondClassObj.name" placeholder="请选择" size="small" @change="changeContent" v-if="selectorInfo[0].children">
          <el-option-group
            v-for="group in selectorInfo"
            :key="group.label"
            :label="group.label"
            >
            <el-option
              v-for="item in group.children"
              :key="item.value"
              :label="item.label"
              :value="group.label+ '/' +item.value+'/'+item.weight">
            </el-option>
          </el-option-group>
        </el-select>
        <el-select v-model="secondClassObj.name" placeholder="请选择" size="small" v-else @change="changeContent">
          <el-option
            v-for="item in selectorInfo"
            :key="item.label"
            :label="item.label"
            :value="item.value+'/'+item.weight"
            >
          </el-option>
        </el-select>
      </div>
      <div class="cell-flex set-margin">
        <span>详细内容: </span>
        <el-input style="width: 50vw" size="small" v-model="secondClassObj.detail" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <van-row class="btn-position">
      <van-col span="12">
        <van-button bottom-action @click="updateSecondClass">提交</van-button>
      </van-col>
      <van-col span="12">
        <van-button type="primary" bottom-action @click="cancelUpdateSecondClass">取消</van-button>
      </van-col>
    </van-row>
    <van-popup position="bottom" transition="popup-slide" style="width: 100vw;height: 30vh" v-model="showPicker">
      <van-picker :columns="pickerColumn" show-toolbar @cancel="pickerCancel" @confirm="pickerConfirm"></van-picker>
    </van-popup>
  </van-popup>
</template>

<script>
import axios from 'axios';
export default {
  props: [ 'addSceondClass', 'SelectOptions' ],
  data() {
    return {
      catagory: '',
      options: [
        {
          label: '社会职务',
          value: 'positions'
        },
        {
          label: '社会活动',
          value: 'activities'
        },
        {
          label: '荣誉称号',
          value: 'honor'
        },
        {
          label: '寝室建设',
          value: 'dorm'
        },
        {
          label: '减分项',
          value: 'decrease'
        },
      ],
      secondClassObj: {
        name: '',
        weight: 0,
        year: '',
        term: '',
        detail: ''
      },
      pickerColumn: [],
      yearColumn: ['2014','2015','2016','2017','2018','2019','2020'],
      termColumn: ['春季学期', '夏季学期','秋季学期'],
      showPicker: false,
      selectorInfo: []
    }
  },
  methods: {
    changeCatagory(val) {
      this.selectorInfo = eval('this.SelectOptions.' + val);
    },
    changeContent(val) {
      const arr = val.split('/');
      if (arr.length === 3) {
        this.secondClassObj.name = arr[0]+'/'+arr[1];
        this.secondClassObj.weight = parseInt(arr[2]);
      } else {
        this.secondClassObj.name = arr[0];
        this.secondClassObj.weight = parseInt(arr[1]);
      }
    },
    async updateSecondClass() {
      const obj = {
        openId: localStorage.getItem('userID'),
        catagory: this.catagory,
        content: this.secondClassObj
      };
      const res = await axios.post('/position/submitSecondclass', obj);
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '添加成功',
        })
        this.$emit('reloadSecondclass');
        this.cancelUpdateSecondClass()
      }
    },
    cancelUpdateSecondClass() {
      this.secondClassObj = {
        name: '',
        weight: 0,
        year: '',
        term: '',
        detail: ''
      };
      this.catagory = '';
      this.selectorInfo = [];
      this.$emit('closeSecondClassPopup');
    },
    chooseSecondClassYear() {
      this.pickerColumn = this.yearColumn.concat();
      this.showPicker = true;
    },
    chooseSecondClassTerm() {
      this.pickerColumn = this.termColumn.concat();
      this.showPicker = true;
    },
    pickerConfirm(val) {
      if (isNaN(parseInt(val))) {
        this.secondClassObj.term = val;
      } else {
        this.secondClassObj.year = val;
      }
      this.showPicker = false;
    },
    pickerCancel() {
      this.showPicker = false;
    }
  }
}
</script>

<style scoped>

</style>
