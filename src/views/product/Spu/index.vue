<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <!-- 普通表格 -->
      <div v-show="scene === 0">
        <el-button
          icon="el-icon-plus"
          type="primary"
          :disabled="!category3Id"
          @click="addSpu"
        >添加SPU</el-button>
        <el-table border style="margin: 20px 0px" :data="spuList">
          <el-table-column
            label="序号"
            align="center"
            width="80px"
            type="index"
          />
          <el-table-column label="SPU名称" prop="spuName" />
          <el-table-column label="SPU描述" prop="description" />
          <el-table-column label="操作">
            <template slot-scope="{ row}">
              <el-button
                icon="el-icon-plus"
                type="success"
                size="small"
                title="添加SKU"
                @click="addSku(row)"
              />
              <el-button
                icon="el-icon-edit"
                type="warning"
                size="small"
                title="修改SPU"
                @click="editSpu(row)"
              />
              <el-button
                icon="el-icon-info"
                type="info"
                size="small"
                title="查看当前spu全部sku列表"
                @click="openSkuList(row)"
              />
              <el-button
                icon="el-icon-delete"
                type="danger"
                size="small"
                title="这是一段内容确定删除吗？"
                @click="delSpu(row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          layout="prev,pager,next,jumper"
          :page-size="limit"
          :total="total"
          :current-page="page"
          style="text-align: center"
          @current-change="getSpuList"
        />
      </div>
      <!-- spu表格组件 -->
      <SpuForm
        v-show="scene === 1"
        ref="spu"
        @changeScene="changeScene"
      />
      <!-- 添加SKU表格 -->
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScene="changeScene"
      />
    </el-card>
    <!--对话框，展示SKU列表-->
    <div>
      <el-dialog
        :visible.sync="dialogTableVisible"
        :title="`${spu.spuName}SKU列表`"
        :before-close="close"
      >
        <el-table v-loading="loading" :data="skuList" border>
          <el-table-column prop="skuName" label="名称" />
          <el-table-column prop="price" label="价格" />
          <el-table-column prop="weight" label="重量" />
          <el-table-column label="默认图片">
            <template slot-scope="{row}">
              <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px;">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import SpuForm from './spuForm'
import SkuForm from './skuForm'
export default {
  name: 'Spu',
  components: {
    SpuForm,
    SkuForm
  },
  data() {
    return {
      limit: 3,
      page: 1,
      total: 0,
      category1Id: '',
      category2Id: '',
      category3Id: '',
      spuList: [],
      scene: 0,
      dialogTableVisible: false, // 控制SKU列表对话框显示与隐藏,
      skuList: [],
      spu: {}, // 保存当前选中spu信息
      loading: true// 控制加载样式的显示与隐藏
    }
  },

  mounted() {},

  methods: {
    // 从子组件获取CategoryId
    getCategoryId(categoryId) {
      const { category1Id, category2Id, category3Id } = categoryId
      this.category3Id = category3Id
      this.category2Id = category2Id
      this.category1Id = category1Id
      this.getSpuList()
    },
    // 获取SPU列表
    async getSpuList(pager = 1) {
      this.page = pager
      const result = await this.$API.spu.reqSpuList(
        this.page,
        this.limit,
        this.category3Id
      )
      if (result.code === 200) {
        this.spuList = result.data.records
        this.total = result.data.total
      }
    },
    // 添加SPU按钮触发
    addSpu() {
      this.scene = 1
      // 通知子组件SpuForm触发addSpuData事件，并传参，发送请求
      this.$refs.spu.addSpuData(this.category3Id)
    },
    // 修改SPU按钮触发
    editSpu(row) {
      this.scene = 1
      // 通知子组件SpuForm触发initSpuDate事件，传参，发送请求
      this.$refs.spu.initSpuDate(row)
    },
    // 删除SPU按钮触发
    async delSpu(row) {
      const result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '删除成功' })
        // 刷新页面，SPU个数大于1删除时候停留在当前页，小于1就返回上一页。
        this.getSpuList(this.spuList.length > 1 ? this.page : this.page - 1)
      }
    },
    // 添加SKU按钮触发
    addSku(row) {
      this.$refs.sku.addSku(this.category1Id, this.category2Id, row)
      this.scene = 2
    },
    // 子组件SpuForm取消按钮触发
    changeScene(flag) {
      this.scene = 0
      if (flag.flag === 'save') {
        this.getSpuList()
      }
    },
    async openSkuList(row) {
      this.dialogTableVisible = true
      // 保存当前spu信息
      this.spu = row
      // 发请求，获取SKU列表
      const result = await this.$API.spu.reqSkuList(row.id)
      if (result.code === 200) {
        this.skuList = result.data
        // 关闭loading
        this.loading = false
      }
    },
    // 关闭对话框触发
    close(done) {
      this.loading = true
      this.skuList = []
      // 关闭对话框
      done()
    }
  }
}
</script>

<style scoped>
</style>
