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
export default {
  name: 'adminSecondClassTable',
  props: ['requiredData', 'needOperator'],
  methods: {
    async handleSuccess() {

    },
    async handleFail() {

    }
  }
}
</script>

<style>

</style>
