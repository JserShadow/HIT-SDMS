<template>
  <el-table
  :data="infoData"
  style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" >
          <div class="layout">
            <el-form-item label="性别">
              <span>{{ props.row.basicInfo.gender }}</span>
            </el-form-item>
            <el-form-item label="专业">
              <span>{{ props.row.basicInfo.major }}</span>
            </el-form-item>
            <el-form-item label="班级">
              <span>{{ props.row.basicInfo.className }}</span>
            </el-form-item>
            <!-- <el-form-item label="少数民族">
              <span>{{ props.row.basicInfo.minority }}</span>
            </el-form-item>
            <el-form-item label="民族">
              <span>{{ props.row.basicInfo.volk }}</span>
            </el-form-item>
            <el-form-item label="生日">
              <span>{{ props.row.basicInfo.birthday }}</span>
            </el-form-item>
            <el-form-item label="籍贯">
              <span>{{ props.row.basicInfo.nativePlace }}</span>
            </el-form-item>
            <el-form-item label="寝室号">
              <span>{{ props.row.basicInfo.dormId }}</span>
            </el-form-item>
            <el-form-item label="入学方式">
              <span>{{ props.row.basicInfo.enrolment }}</span>
            </el-form-item>
            <el-form-item label="国防生">
              <span>{{ props.row.basicInfo.NDstudent }}</span>
            </el-form-item>
            <el-form-item label="党员">
              <span>{{ props.row.basicInfo.partyMember }}</span>
            </el-form-item> -->
            <el-form-item label="手机号">
              <span>{{ props.row.basicInfo.phoneNumber }}</span>
            </el-form-item>
            <!-- <el-form-item label="QQ">
              <span>{{ props.row.personalInfo.QQ }}</span>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <span>{{ props.row.personalInfo.EMail }}</span> -->
            <!-- </el-form-item> -->
            <el-form-item label="微信号">
              <span>{{ props.row.basicInfo.wx }}</span>
            </el-form-item>
          </div>
          <!-- <el-form-item label="家庭住址" class="self" style="text-align: left">
            <span>{{ props.row.personalInfo.familyAddress }}</span>
          </el-form-item> -->
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="学生姓名"
      prop="basicInfo.name">
    </el-table-column>
    <el-table-column
      label="学号"
      prop="basicInfo.stuId">
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
  props: [ 'infoData', 'needOperator' ],
  methods: {
    async handleSuccess(index, row) {
      const res = await axios.post('/admin/info/pass', { id: row._id });
      if (res.data.message === 'ok') {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }
      this.$emit('refresh');
    },
    async handleFail(index, row) {
      const res = await axios.post('/admin/info/fail', { id: row._id });
      if (res.data.message === 'ok') {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }
      this.$emit('refresh');
    },
  }
}
</script>

<style scoped>
.el-table th {
  text-align: center;
}
.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
  max-height: 30vh;
}
.self {
  flex-grow: 100;
}
span {
  color: #aaaaaa;
}
</style>
