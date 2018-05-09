<template>
  <el-table
  :data="requiredData"
  style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand layout" v-for="item in props.row.res" :key="item._id">
            <el-form-item label="学期">
              <span>{{ item.gradeName.year + item.gradeName.term }}</span>
            </el-form-item>
            <el-form-item label="分数">
              <span>{{ item.score }}</span>
            </el-form-item>
            <el-form-item label="是否通过">
              <span>{{ item.hasPass?'是':'不是' }}</span>
            </el-form-item>
            <el-form-item label="不及格科目">
              <span>{{ item.failingCourse.length?item.failingCourse.join(';'):'无' }}</span>
            </el-form-item>
            <el-form-item label="挂科科目">
              <span>{{ item.failedCourse.length?item.failedCourse.join(';'):'无' }}</span>
            </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="学生姓名"
      prop="name">
    </el-table-column>
    <el-table-column
      label="学号"
      prop="stuId">
    </el-table-column>
    <el-table-column label="操作" v-if="needOperator">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleSuccess(scope.$index, scope.row)">通过审核</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleFail(scope.$index, scope.row)">不通过审核</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';
export default {
  props: [ 'requiredData', 'needOperator' ],
  methods: {
    async handleSuccess(index, row) {
      const res = await axios.post('/admin/score/pass', { row });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      }
      this.$emit('refresh');
    },
    async handleFail(index, row) {
      const res = await axios.post('/admin/score/fail', { row });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      }
      this.$emit('refresh');
    }
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
  max-height: 15vh;
}
</style>
