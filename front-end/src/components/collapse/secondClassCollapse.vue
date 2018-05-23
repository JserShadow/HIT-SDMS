<template>
  <div>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="社会职务" name="1">
        <div class="flex-collapse" v-for="(item, index) in secondClassInfo.position">
          <div class="innerflex">
            <span>{{item.detail}}</span>
            <span class="time">{{item.year+item.term+'/'+item.weight+'分'}}</span>
          </div>
          <el-button slot="right-icon" style="color: #ff3333" type="text" @click="deleteSingleRecord(index, 'position')">删除</el-button>
        </div>
      </van-collapse-item>
      <van-collapse-item title="社会活动" name="2">
        <div class="flex-collapse" v-for="(item, index) in secondClassInfo.activities">
          <div class="innerflex">
            <span>{{item.detail}}</span>
            <span class="time">{{item.year+item.term+'/'+item.weight+'分'}}</span>
          </div>
          <el-button slot="right-icon" style="color: #ff3333" type="text" @click="deleteSingleRecord(index, 'activities')">删除</el-button>
        </div>
      </van-collapse-item>
      <van-collapse-item title="荣誉称号" name="3">
        <div class="flex-collapse" v-for="(item, index) in secondClassInfo.honor">
          <div class="innerflex">
            <span>{{item.detail}}</span>
            <span class="time">{{item.year+item.term+'/'+item.weight+'分'}}</span>
          </div>
          <el-button slot="right-icon" style="color: #ff3333" type="text" @click="deleteSingleRecord(index, 'honor')">删除</el-button>
        </div>
      </van-collapse-item>
      <van-collapse-item title="寝室建设" name="4">
        <div class="flex-collapse" v-for="(item, index) in secondClassInfo.dorm">
          <div class="innerflex">
            <span>{{item.detail}}</span>
            <span class="time">{{item.year+item.term+'/'+item.weight+'分'}}</span>
          </div>
          <el-button slot="right-icon" style="color: #ff3333" type="text" @click="deleteSingleRecord(index, 'dorm')">删除</el-button>
        </div>
      </van-collapse-item>
      <van-collapse-item title="减分项" name="5">
        <div class="flex-collapse" v-for="(item, index) in secondClassInfo.decrease">
          <div class="innerflex">
            <span>{{item.detail}}</span>
            <span class="time">{{item.year+item.term+'/'+item.weight+'分'}}</span>
          </div>
          <el-button slot="right-icon" style="color: #ff3333" type="text" @click="deleteSingleRecord(index, 'decrease')">删除</el-button>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['secondClassInfo'],
  data() {
    return {
      activeName: '0'
    }
  },
  methods: {
    async deleteSingleRecord(index, arr) {
      const mainObj = this.secondClassInfo;
      eval('mainObj.'+arr+'.splice(index, 1)');
      mainObj.status = '待审核';
      const res = await axios.post('/position/updateDelete', {
        openId: localStorage.getItem('userID'),
        result: mainObj
      })
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '删除成功',
        })
        this.$emit('reloadSecondclass');
      }
    }
  }
}
</script>

<style scoped>
.flex-collapse {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  font-size: .875rem;
  color: #333;
}
.innerflex {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.time {
  color: #cccccc;
}
</style>
