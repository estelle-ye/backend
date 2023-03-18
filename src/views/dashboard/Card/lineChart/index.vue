<template>
  <div ref="charts" class="charts" />
</template>

<script>

import * as echarts from 'echarts'
export default {
  name: '',

  data() {
    return {}
  },

  mounted() {
    
    const lineChart = echarts.init(this.$refs.charts)
    
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
          
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: 'purple'
          },
          
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
                  color: 'purple' 
                },
                {
                  offset: 1,
                  color: 'white' 
                }
              ],
              global: false 
            }
          }
        }
      ],
      
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
