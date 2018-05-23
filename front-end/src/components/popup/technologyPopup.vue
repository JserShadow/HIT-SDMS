<template>
  <van-popup v-model="showTechnologyPopup" position="right" :overlay="false" style="height:100vh;width: 100vw;overflow-y: scroll">
    <div class="popup-header">添加科技创新表现</div>
    <div class="cell-flex set-margin">
      <div>学年: {{technologyObj.year}}</div>
      <van-button size="small" type="primary" @click="chooseTechnologyYear">选择学年</van-button>
    </div>
    <div class="cell-flex set-margin">
      <div>学期: {{technologyObj.term}}</div>
      <van-button size="small" type="primary" @click="chooseTechnologyTerm">选择学期</van-button>
    </div>
    <div class="cell-flex set-margin">
      <div>选择科技创新类型: </div>
      <el-select v-model="selectedOptions" placeholder="请选择" @change="changeTechChoice">
        <el-option-group
          v-for="group in technologySelections"
          :key="group.label"
          :label="group.label">
          <el-option
            v-for="item in group.children"
            :key="item.value"
            :label="item.label"
            :value="group.label+'/'+item.value+'/'+item.weight">
          </el-option>
        </el-option-group>
      </el-select>
    </div>
    <div class="cell-flex set-margin">
      <div>填写详细内容: </div>
      <el-input v-model="technologyObj.detail" placeholder="请输入详细内容" style="width: 50vw"></el-input>
    </div>
    <van-row class="btn-position">
      <van-col span="12">
        <van-button bottom-action @click="updateTechnology">提交</van-button>
      </van-col>
      <van-col span="12">
        <van-button type="primary" bottom-action @click="cancelUpdateTechnology">取消</van-button>
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
  name: 'TechnologyPopup',
  props: ['showTechnologyPopup', 'technologySelections'],
  data() {
    return {
      pickerColumn: [],
      yearColumn: ['2014','2015','2016','2017','2018','2019','2020'],
      termColumn: ['春季学期', '夏季学期','秋季学期'],
      selectedOptions: [],
      technologyObj: {
        name: '',
        weight: 0,
        year: '',
        term: '',
        detail: ''
      },
      technologys: [],
      showPicker: false,
    }
  },
  methods: {
    chooseTechnologyYear() {
      this.pickerColumn = this.yearColumn.concat();
      this.showPicker = true;
    },
    chooseTechnologyTerm() {
      this.pickerColumn = this.termColumn.concat();
      this.showPicker = true;
    },
    pickerConfirm(val) {
      if (isNaN(parseInt(val))) {
        this.technologyObj.term = val;
      } else {
        this.technologyObj.year = val;
      }
      this.showPicker = false;
    },
    pickerCancel() {
      this.showPicker = false;
    },
    changeTechChoice(val) {
      const arr = val.split('/');
      this.technologyObj.weight = parseInt(arr[2]);
      arr.splice(2,1);
      this.technologyObj.name = arr.join('/');
    },
    async updateTechnology() {
      const res = await axios.post('/technology/updateTechnologys', {
        openId: localStorage.getItem('userID'),
        technology: this.technologyObj,
      });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.cancelUpdateTechnology();
        this.$emit('reloadTechnologys');
      }
    },
    cancelUpdateTechnology() {
      this.technologyObj = {
        year: '',
        weight: 0,
        term: '',
        name: ''
      };
      this.$emit('closeTechnologyPopup');
    },
  }
}
</script>

<style scoped>
.cell-flex {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}
.set-margin {
  margin-bottom: 15px;
}
.btn-position {
  margin-top: 20px;
}
.popup-header {
  font-size: 1.5625rem;
  padding: 10px;
  letter-spacing: 5px;
}
.el-cascader-menu {
  width: 50vw;
  max-width: 50vw;
}
</style>
