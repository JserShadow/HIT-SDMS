<template>
  <el-menu
      :default-active="activeBar"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      @select="changeSelection">
      <el-menu-item index="/admin/info">
        <i class="el-icon-info"></i>
        <span slot="title">个人信息管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/score">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">分数信息管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/secondclass">
        <i class="el-icon-tickets"></i>
        <span slot="title">德育表现管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/scholarship">
        <i class="el-icon-star-on"></i>
        <span slot="title">奖学金管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/technology">
        <i class="el-icon-setting"></i>
        <span slot="title">科技创新表现管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/certificate">
        <i class="el-icon-document"></i>
        <span slot="title">其他证书管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/socialpractice">
        <i class="el-icon-news"></i>
        <span slot="title">社会实践管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/remark">
        <i class="el-icon-message"></i>
        <span slot="title">备注管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/export2csv">
        <i class="el-icon-download"></i>
        <span slot="title">数据导出</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      activeBar: '/admin/info'
    }
  },
  methods: {
    changeSelection(index) {
      this.activeBar = index;
    }
  }
}
</script>

<style>

</style>
