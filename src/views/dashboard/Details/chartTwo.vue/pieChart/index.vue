<template>
  <div ref="chart" class="chart" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  mounted() {
    const myChart = echarts.init(this.$refs.chart)
    myChart.setOption({
      title: {
        text: '',
        subtext: '',
        left: 'center',
        top: 'center'
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335,
              name: 'Apple'
            },
            {
              value: 310,
              name: 'Grapes'
            },
            {
              value: 234,
              name: 'Pineapples'
            }
          ],
          // 空心pie样式设置radius:[内半径，外半径]
          radius: [60, 90]
        }
      ]
    })

    myChart.on('mouseover', (params) => {
      const { name, value } = params.data
      myChart.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  },

  methods: {}
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 200px;
}
</style>
