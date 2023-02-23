<template>
  <div ref="charts" class="charts" />
</template>

<script>
// 引入echarts 先下载依赖 cnpm install --save echarts
import * as echarts from 'echarts'
export default {
  name: '',

  data() {
    return {}
  },

  mounted() {
    // 初始化echarts实例
    const lineChart = echarts.init(this.$refs.charts)
    // 配置
    lineChart.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          data: [10, 7, 33, 21, 18, 19, 21, 88, 10, 7, 33, 21, 18, 19, 21, 88],
          // 拐点样式，设置为平滑的
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: 'purple'
          },
          // 区域填充样式
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'purple' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'white' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    })
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
