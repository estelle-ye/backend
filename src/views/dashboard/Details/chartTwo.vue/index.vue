<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="search-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="1">全部渠道</el-radio-button>
          <el-radio-button label="2">线上</el-radio-button>
          <el-radio-button label="3">门店</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <pieChart v-show="radio1 == 1" />
  </el-card>
</template>

<script>
import pieChart from './pieChart'
export default {
  components: { pieChart },
  data() {
    return {
      radio1: '1'
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style scoped>
.search-header {
  border-bottom: 1px solid rgb(178, 177, 177);
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
</style>
