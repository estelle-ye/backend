<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 头部左侧 -->
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="销售额" name="first">
            <el-row :gutter="10">
              <el-col :span="16">
                <div ref="charts" class="charts" />
              </el-col>
              <el-col :span="8">
                <h3 style="margin-top: 0px">门店销售额排名</h3>
                <ul>
                  <li>
                    <span class="rindex">1</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex">2</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex">3</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex2">4</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex2">5</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex2">6</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex2">7</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                </ul>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="访问量" name="second">
            <el-row :gutter="10">
              <el-col :span="16">
                <div ref="charts2" class="charts" />
              </el-col>
              <el-col :span="8">
                <h3 style="margin-top: 0px">门店访问量排名</h3>
                <ul>
                  <li>
                    <span class="rindex">1</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex">2</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex">3</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex2">4</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex2">5</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex2">6</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                  <li>
                    <span class="rindex2">7</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                  </li>
                </ul>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <!-- 头部右侧 -->
        <div class="right">
          <span style="cursor: pointer" @click="setDay">今日</span>
          <span style="cursor: pointer" @click="setWeek">本周</span>
          <span style="cursor: pointer" @click="setMonth">本月</span>
          <span style="cursor: pointer" @click="setYear">本年</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            size="mini"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'

import dayjs from 'dayjs'

export default {
  data() {
    return {
      value1: '',
      activeName: 'first',
      myChart: null
    }
  },
  
  watch: {
    activeName() {
      
      
      setTimeout(() => {
        this.showChart()
      }, 0)
    }
  },
  mounted() {
    this.showChart()
  },
  methods: {
    showChart() {
      if (this.activeName === 'first') {
        this.myChart = echarts.init(this.$refs.charts)
        this.myChart.setOption({
          title: {
            text: '销售额趋势'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
              ],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Direct',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220, 10, 220, 325, 290, 123]
            }
          ]
        })
      } else {
        this.myChart = echarts.init(this.$refs.charts2)
        this.myChart.setOption({
          title: {
            text: '访问量趋势'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
              ],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Direct',
              type: 'bar',
              barWidth: '60%',
              data: [120, 152, 300, 434, 390, 330, 220, 70, 320, 325, 390, 223],
              color: 'yellowgreen'
            }
          ]
        })
      }
    },
    
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.value1 = [day, day]
    },
    
    setWeek() {
      const day1 = dayjs().startOf('week').format('YYYY-MM-DD')
      const day2 = dayjs().endOf('week').format('YYYY-MM-DD')
      this.value1 = [day1, day2]
    },
    
    setMonth() {
      const day1 = dayjs().startOf('month').format('YYYY-MM-DD')
      const day2 = dayjs().endOf('month').format('YYYY-MM-DD')
      this.value1 = [day1, day2]
    },
    
    setYear() {
      const day1 = dayjs().startOf('year').format('YYYY-MM-DD')
      const day2 = dayjs().endOf('year').format('YYYY-MM-DD')
      this.value1 = [day1, day2]
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 10px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.tab {
  width: 100%;
}

/deep/ .el-tabs__content {
  margin-top: 30px;
}
.right {
  position: absolute;
  right: 0px;
  font-size: 14px;
}
.date {
  margin: 0 20px;
  width: 300px;
}
.right span {
  margin: 0 10px;
}
.charts {
  height: 300px;
  width: 100%;
}
/deep/ .el-card__body {
  padding: 0 20px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 40px;
}

.rindex {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
  float: left;
  line-height: 20px;
  margin-right: 10px;
  font-size: 12px;
}

.rindex2 {
  margin-right: 14px;
  margin-left: 6px;
}

.rvalue {
  float: right;
  margin: 0 10px;
}
</style>
