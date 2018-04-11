<template>
  <van-cell-group>
    <van-field v-model="schoolRollStatus" placeholder="请输入学籍状态" label="学籍状态" />
    <van-field v-model="graduateRoute" placeholder="请输入毕业去向" label="毕业去向" />
    <van-field v-model="remark" label="详情备注" type="textarea" />
  </van-cell-group>
</template>

<script>
export default {
  data() {
    return {
      schoolRollStatus: '',
      graduateRoute: '',
      remark: ''
    }
  }
}
</script>

<style>

</style>
