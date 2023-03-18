<template>
  <div>
    <el-card v-show="!isShow">
      <el-table border :data="skuList" style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        />
        <el-table-column
          label="名称"
          prop="skuName"
          width="width"
        />
        <el-table-column
          label="描述"
          prop="skuDesc"
          width="width"
        />
        <el-table-column label="默认图片" width="110">
          <template slot-scope="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            >
          </template>
        </el-table-column>
        <el-table-column
          label="重量（KG）"
          prop="weight"
          width="80"
        />
        <el-table-column
          label="价格（元）"
          prop="price"
          width="80"
        />
        <el-table-column label="操作" width="width">
          <template slot-scope="{ row, $index }">
            <el-button
              v-if="row.isSale === 1"
              icon="el-icon-sort-down"
              type="info"
              size="mini"
              title="下架"
              @click="sale(row)"
            />
            <el-button
              v-else
              icon="el-icon-sort-up"
              type="success"
              size="mini"
              title="上架"
              @click="sale(row)"
            />
            <el-button
              icon="el-icon-info"
              type="info"
              size="mini"
              @click="getSkuInfo(row)"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(row,$index)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev,pager,next,jumper"
        :page-size="limit"
        :total="total"
        :current-page="page"
        style="text-align: center"
        @current-change="getSkuList"
      />
    </el-card>
    <el-card v-show="isShow">
      <SkuForm ref="sku" />
    </el-card>
    <el-drawer
      v-loading="loading"
      :visible.sync="drawer"
      direction="rtl"
      size="50%"
      :show-close="false"
      :before-close="close"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price + "元" }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            v-for="(item, index) in skuInfo.skuAttrValueList"
            :key="index"
          >{{ item.attrName }}:{{ item.valueName }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <!--走马灯展示图-->
          <el-carousel height="200px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" style="height: 200px">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" />
        <el-col :span="16" />
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import SkuForm from '../Spu/skuForm'
export default {
  name: 'Sku',
  components: { SkuForm },
  data() {
    return {
      limit: 10,
      total: 0,
      page: 1,
      skuList: [],
      drawer: false,
      loading: true,
      skuInfo: {},
      isShow: false 
    }
  },

  mounted() {
    this.getSkuList()
  },

  methods: {
    async getSkuList(pager = 1) {
      this.page = pager
      const result = await this.$API.sku.reqSkuList(this.page, this.limit)
      if (result.code === 200) {
        this.total = result.data.total
        this.skuList = result.data.records
      }
    },
    async sale(row) {
      if (row.isSale === 0) {
        const result = await this.$API.sku.reqSale(row.id)
        if (result.code === 200) {
          row.isSale = 1
          this.$message({ type: 'success', message: '上架成功' })
        }
      } else {
        const result = await this.$API.sku.reqCancel(row.id)
        if (result.code === 200) {
          row.isSale = 0
          this.$message({ type: 'success', message: '下架成功' })
        }
      }
    },
    async getSkuInfo(row) {
      this.drawer = true
      const result = await this.$API.sku.reqSkuInfo(row.id)
      if (result.code === 200) {
        this.skuInfo = result.data
        this.loading = false
      }
    },

    close(done) {
      this.skuInfo = {}
      this.loading = true
      done()
    },
    async del(row, index) {
      const result = await this.$API.sku.reqSkuDel(row.id)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '删除成功' })
        this.skuList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-col {
  margin: 10px 10px;
}
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
  font-weight: 700;
}
/deep/ .el-drawer__header {
  margin-bottom: 0px;
}
</style>
