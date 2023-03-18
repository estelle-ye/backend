<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <svg
        t="1675425733407"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2682"
        width="16"
        height="16"
      >
        <path
          d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
          fill="#000000"
          p-id="2683"
        />
      </svg>
    </div>
    <div class="main">
      <span style="font-size: 20px">123,21</span>
      <span>2.1
        <!--冲上-->
        <svg
          t="1675437283497"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3823"
          width="16"
          height="16"
        >
          <path
            d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
            fill="#fe3f26"
            p-id="3824"
          />
        </svg>
        <!--冲下-->
        <svg
          t="1675437563260"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4987"
          width="16"
          height="16"
        >
          <path
            d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
            fill="#03b00f"
            p-id="4988"
          />
        </svg>
      </span>
    </div>
    <div class="foot">
      <div ref="chart" class="chart" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  mounted() {
    const lineChart = echarts.init(this.$refs.chart)
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
            color: 'skyblue'
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
                  color: 'skyblue'
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

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.main span {
  display: inline-block;
  margin-right: 20px;
}
.chart {
  width: 100%;
  height: 50px;
}
</style>
