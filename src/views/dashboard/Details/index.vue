<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <chartOne />
    </el-col>
    <el-col :span="12">
      <chartTwo />
    </el-col>
  </el-row>
</template>

<script>
import chartOne from './chartOne.vue'
import chartTwo from './chartTwo.vue'
export default {
  components: { chartOne, chartTwo },
  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 10px;
}
</style>
