<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card><Detail title="总销售额" count="￥18893">
          <template slot="charts">
            <div style="font-size: 14px; line-height: 60px">
              <span>周同比 56.67%<svg
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
              </span>
              <span>日同比 19.16%<svg
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
          </template>
          <template slot="footer">
            <span>日销售额 ￥12423</span>
          </template>
        </Detail></el-card>
      </el-col>
      <el-col :span="6">
        <el-card><Detail title="访问量" count="88460">
          <template slot="charts">
            <lineChart />
          </template>
          <template slot="footer">日访问量1234</template>
        </Detail></el-card>
      </el-col>
      <el-col :span="6">
        <el-card><Detail title="支付笔数" count="88460">
          <template slot="charts">
            <barChart />
          </template>
          <template slot="footer">转换率 64%</template>
        </Detail></el-card>
      </el-col>
      <el-col :span="6">
        <el-card><Detail title="运营活动效果" count="78%">
          <template slot="charts">
            <progressChart />
          </template>
          <template slot="footer">
            <span>周同比 56.67%<svg
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
            </span>
            <span>日同比 19.16%<svg
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
          </template> </Detail></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import lineChart from './lineChart'
import barChart from './barChart'
import progressChart from './progressChart'
export default {
  name: '',
  components: { Detail, lineChart, barChart, progressChart },
  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
