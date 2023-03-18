<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',

  data() {
    return {

    }
  },

  mounted() {
    const barChart = echarts.init(this.$refs.charts)
    barChart.setOption({
      xAxis: {
        show: false,
        type: 'category',
        data: ['电影', '小说', '服饰', '餐饮', '商场', '景区']
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [2, 4, 5, 6, 7, 4]
        }
      ],
      grid: {
        left: 0, right: 0
      },
      tooltip: {}
    })
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
