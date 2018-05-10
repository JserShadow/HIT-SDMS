<template>
  <div>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="社会职务" name="1">
        <van-cell-group v-for="item in secondClassInfo.position">
          <van-cell :title="item.name" :value="item.weight" />
        </van-cell-group>
      </van-collapse-item>
      <van-collapse-item title="社会活动" name="2">
        <van-cell-group v-for="item in secondClassInfo.activities">
          <van-cell :title="item.name" :value="item.weight" />
        </van-cell-group>
      </van-collapse-item>
      <van-collapse-item title="荣誉称号" name="3">
        <van-cell-group v-for="item in secondClassInfo.honor">
          <van-cell :title="item.name" :value="item.weight" />
        </van-cell-group>
      </van-collapse-item>
      <van-collapse-item title="寝室建设" name="4">
        <van-cell-group v-for="item in secondClassInfo.dorm">
          <van-cell :title="item.name" :value="item.weight" />
        </van-cell-group>
      </van-collapse-item>
      <van-collapse-item title="减分项" name="5">
        <van-cell-group v-for="item in secondClassInfo.decrease">
          <van-cell :title="item.name" :value="item.weight" />
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  props: ['secondClassInfo'],
  data() {
    return {
      activeName: '0'
    }
  }
}
</script>

<style>

</style>
