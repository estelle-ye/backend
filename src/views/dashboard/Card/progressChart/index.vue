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
          
          barWidth: 10,
          
          showBackground: true,
          color: 'yellowgreen',
          
          label: {
            show: true,
            
            formatter: '|',
            
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
