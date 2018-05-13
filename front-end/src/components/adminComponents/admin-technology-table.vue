<template>
  <el-table
  :data="requiredData"
  style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" v-for="item in props.row.technologys" :key="item._id" style="text-align: left">
          <el-form-item label="学期:">
            <span>{{ item.year + item.term }}</span>
          </el-form-item>
          <el-form-item label="科技创新:">
            <span>{{ item.name }}</span>
          </el-form-item>
          <el-form-item label="权重:">
            <span>{{ item.weight }}</span>
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
  name: 'AdminTechnologyTable',
  props: [ 'requiredData', 'needOperator' ],
  methods: {
    async handleSuccess(index, row) {
      const res = await axios.post('/admin/technology/pass', { id: row._id });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '操作成功'
        });
        this.$emit('refresh');
      }
    },
    async handleFail(index, row) {
      const res = await axios.post('/admin/technology/fail', { id: row._id });
      if (res.data.message === 'ok') {
        this.$message({
          type: 'success',
          message: '操作成功'
        });
        this.$emit('refresh');
      }
    }
  }
}
</script>

<style>

</style>
