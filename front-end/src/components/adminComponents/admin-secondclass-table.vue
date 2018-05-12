<template>
  <el-table
  :data="requiredData"
  style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <div>
          <div style="text-align: left;font-weight: bold">社会职务</div>
          <ul>
            <li v-for="position in props.row._doc.position" style="display: flex;justify-content: space-between;padding: 0 5px" :key="position._id">
              <span>{{position.name}}</span>
              <span style="color: #ff3333">{{position.weight}}</span>
            </li>
          </ul>
          <div style="text-align: left;font-weight: bold">荣誉称号</div>
          <ul>
            <li v-for="honor in props.row._doc.honor" style="display: flex;justify-content: space-between;padding: 0 5px" :key="honor._id">
              <span>{{honor.name}}</span>
              <span style="color: #ff3333">{{honor.weight}}</span>
            </li>
          </ul>
          <div style="text-align: left;font-weight: bold">社会活动</div>
          <ul>
            <li v-for="activities in props.row._doc.activities" style="display: flex;justify-content: space-between;padding: 0 5px" :key="activities._id">
              <span>{{activities.name}}</span>
              <span style="color: #ff3333">{{activities.weight}}</span>
            </li>
          </ul>
          <div style="text-align: left;font-weight: bold">寝室建设</div>
          <ul>
            <li v-for="dorm in props.row._doc.dorm" style="display: flex;justify-content: space-between;padding: 0 5px" :key="dorm._id">
              <span>{{dorm.name}}</span>
              <span style="color: #ff3333">{{dorm.weight}}</span>
            </li>
          </ul>
          <div style="text-align: left;font-weight: bold">减分项</div>
          <ul>
            <li v-for="decrease in props.row._doc.decrease" style="display: flex;justify-content: space-between;padding: 0 5px" :key="decrease._id">
              <span>{{decrease.name}}</span>
              <span style="color: #ff3333">{{decrease.weight}}</span>
            </li>
          </ul>
        </div>
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
  name: 'adminSecondClassTable',
  props: ['requiredData', 'needOperator'],
  methods: {
    async handleSuccess(index, row) {
      const res = await axios.post('/admin/secondclass/pass', { row: row._doc });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '操作成功'
        });
        this.$emit('reload');
      }
    },
    async handleFail(index, row) {
      const res = await axios.post('/admin/secondclass/fail', { row: row._doc });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '操作成功'
        });
        this.$emit('reload');
      }
    }
  }
}
</script>

<style>

</style>
