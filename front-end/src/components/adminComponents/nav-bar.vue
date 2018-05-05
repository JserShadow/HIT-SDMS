<template>
  <el-menu
      default-active="/admin/info"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <el-menu-item index="/admin/info">
        <i class="el-icon-info"></i>
        <span slot="title">个人信息管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/score">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">分数信息管理</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>

</style>
