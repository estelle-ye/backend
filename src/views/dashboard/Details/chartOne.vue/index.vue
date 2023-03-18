<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="search-header">
        <span>线上热门热搜</span>
        <el-dropdown>
          <span>
            <i class="el-icon-more" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :span="12">
        <lineChart />
      </el-col>
      <el-col :span="12">
        <lineChart />
      </el-col>
    </el-row>
    <el-table max-height="200" border style="width: 100%; margin-top: 20px">
      <el-table-column label="排名" width="80" type="index" />
      <el-table-column label="搜索关键字" width="180" />
      <el-table-column label="用户数" sortable />
      <el-table-column label="周涨幅" sortable />
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="100"
        hide-on-single-page
      />
    </div>
  </el-card>
</template>

<script>
import lineChart from './lineChart.vue'
export default {
  components: {
    lineChart
  },

  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="less" scoped>
.search-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(178, 177, 177);
  padding-bottom: 15px;
}

/deep/.el-card__body {
  padding-top: 0px;
}
.block {
  text-align: right;
  padding-top: 10px;
}
</style>
