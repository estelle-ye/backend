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
        // 最小值与最大值设定
        min: 0, max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [78],
          // 柱状图宽度设置
          barWidth: 10,
          // 设置显示背景颜色
          showBackground: true,
          color: 'yellowgreen',
          // 设置图形上的文本标签
          label: {
            show: true,
            // 文本内容
            formatter: '|',
            // 文本的位置
            position: 'right'
          }
        }
      ],
      grid: {
        left: 0, right: 0
      }
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
