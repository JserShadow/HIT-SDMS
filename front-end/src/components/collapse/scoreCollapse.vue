<template>
<div>
  <div v-if="!scores.length" class="no-data">
    暂无成绩数据
  </div>
  <van-collapse v-else v-model="activeName" accordion @change="changeGrade">
    <van-collapse-item v-for="(item, index) in scores" :title="item.gradeName.year+item.gradeName.term" :key="item._id" :name="(index+1).toString()" >
      <van-panel>
        <div slot="header" style="display: flex;justify-content: space-between">
          <div>平均学分绩</div>
          <div style="color: #ff3333">{{item.score}}</div>
        </div>
        <div style="padding: 0px 13px;">
          <div style="display: flex;justify-content: space-between;margin-bottom: 10px; margin-top: 10px;">
            <div>是否通过考试</div>
            <div>{{item.hasPass ? '是' : '否'}}</div>
          </div>
          <div v-if="!item.hasPass">
            <div style="display: flex;justify-content: space-between;margin-bottom: 10px;">
              <div>不及格科目</div>
              <div>{{item.failingCourse.join(',')}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;margin-bottom: 10px;">
              <div>挂科科目</div>
              <div>{{item.failedCourse.join(',')}}</div>
            </div>
          </div>
        </div>
        <div slot="footer" style="display: flex;justify-content: space-around">
          <van-button size="small" @click="toEditScore(index)">编辑</van-button>
          <van-button size="small" type="danger" @click="toDeleteScore(index)">删除</van-button>
        </div>
      </van-panel>
    </van-collapse-item>
  </van-collapse>
</div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['scores'],
  data() {
    return {
      activeName: '0',
    }
  },
  methods: {
    changeGrade(act) {
      console.log(act);
    },
    toEditScore(index) {
      this.$emit('toEditScore', this.scores[index]);
    },
    toDeleteScore(index) {
      this.$dialog.alert({
        title: '删除确认',
        message: '确定要删除这条数据吗？删除后不可恢复',
        confirmButtonText: '删除',
        showCancelButton: true,
      }).then(async () => {
        const res = await axios.post('/score/deleteScore', { score: this.scores[index] });
        if (res.data.message === 'ok') {
          this.$toast.success('删除成功');
          location.reload();
        }
      }).catch(() => {
        return;
      });
    },
  }
}
</script>

<style scoped>
.no-data {
  width: 100%;
  height: 1.25rem;
  color: #aaaaaa;
}
[class*=van-hairline]::after {
  border-top: none;
}
.van-panel__header {
  padding: 0px 15px 10px 15px;
}
.van-hairline--top-bottom::after {
  border-bottom: none;
}
</style>
