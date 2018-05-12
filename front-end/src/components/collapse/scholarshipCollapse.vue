<template>
  <div>
    <div v-if="!scholarships.scholarships.length">暂无数据</div>
    <van-cell-group v-else>
      <van-cell v-for="scholarship in scholarships.scholarships" :key="scholarship._id" :title="scholarship.name" :value="scholarship.term"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ScholarshipCollapse',
  props: [ 'scholarships' ],
  data() {
    return {
      activeName: '0'
    }
  },
}
</script>

<style scoped>

</style>
