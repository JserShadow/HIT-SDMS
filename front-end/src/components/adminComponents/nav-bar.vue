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
