<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称">{{ spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input
          v-model="skuInfo.skuName"
          placeholder="请输入SKU名称"
        />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model="skuInfo.price"
          placeholder="请输入价格(元)"
        />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input
          v-model="skuInfo.weight"
          placeholder="请输入重量(千克)"
        />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          v-model="skuInfo.skuDesc"
          type="textarea"
          :rows="4"
          placeholder="请输入SKU规格描述"
        />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="100px" :inline="true">
          <el-form-item
            v-for="(item, index) in attrInfoList"
            :key="index"
            :label="item.attrName"
          >
            <el-select v-model="item.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="(attrValue) in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attrValue.attrId}:${attrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="80px" :inline="true">
          <el-form-item
            v-for="(item, index) in spuSaleAttrList"
            :key="index"
            :label="item.saleAttrName"
          >
            <el-select v-model="item.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="(saleAttrValue) in item.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${item.id}:${saleAttrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          border
          style="margin-bottom: 20px"
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80" />
          <el-table-column label="图片">
            <template slot-scope="{row}">
              <img
                :src="row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              >
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" />
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button
                v-if="row.isDefault === 0"
                size="small"
                type="primary"
                @click="changeDefault(row)"
              >设置默认</el-button>
              <el-button v-else size="small">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="close('cancel')">取消</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',

  data() {
    return {
      spuName: '',
      skuInfo: {
        // 用于提交服务器的sku信息
        // 父组件提供
        category3Id: 0,
        spuId: '',
        tmId: 0,
        // 从表格收集
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        skuDefaultImg: '', // 收集默认图地址
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   saleAttrId: 0,
          //   saleAttrValueId: 0
          // },
        ]
      },
      spuImageList: [], // 储存收集到的图片信息
      spuSaleAttrList: [], // 储存收集到的销售属性信息
      attrInfoList: [], // 储存收集到的平台属性信息
      imageList: [] // 储存选取的图片信息，用于提交服务器
    }
  },

  mounted() {},

  methods: {
    // 父组件通知子组件触发
    async addSku(category1Id, category2Id, row) {
      // 1.收集信息
      this.spuName = row.spuName
      this.skuInfo.spuId = row.id
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.tmId = row.tmId
      // 2.获取图片信息
      const result = await this.$API.spu.reqSpuImageList(row.id)
      if (result.code === 200) {
        const list = result.data
        // 给每个图片加上isDefault属性，值为0，用于设置默认图
        list.forEach((item) => {
          item.isDefault = 0
        })
        this.spuImageList = list
      }
      // 3.获取销售属性信息
      const saleResult = await this.$API.spu.reqSpuSaleAttrList(row.id)
      if (saleResult.code === 200) {
        this.spuSaleAttrList = saleResult.data
      }
      // 4.获取平台属性信息
      const attrInfoResult = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        row.category3Id
      )
      if (attrInfoResult.code === 200) {
        this.attrInfoList = attrInfoResult.data
      }
    },
    // 选择图片触发
    handleSelectionChange(params) {
      // 该方法会自动获取选择对象为参数
      this.imageList = params
    },
    // 设置默认按钮触发
    changeDefault(row) {
      // 图片列表的数据的isDefault字段变为 0
      this.spuImageList.forEach((item) => {
        item.isDefault = 0
      })
      // 点击的图isDefault属性变为1
      row.isDefault = 1
      // 收集默认图的地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },

    // 关闭页面
    close(flag) {
      this.$emit('changeScene', {
        flag: flag
      })
      // 清数据
      Object.assign(this._data, this.$options.data())
    },

    // 保存
    async save() {
      // 整理参数
      // 整理平台属性
      const { skuInfo, imageList, attrInfoList, spuSaleAttrList } = this
      // 整理平台属性的数据，以[{arrId,valuleId},{arrId,valuleId},{arrId,valuleId}...]的格式传入服务器
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])
      // 整理销售属性的数据
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // 整理图片的数据
      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      // 发请求
      const result = await this.$API.spu.reqAddSku(skuInfo)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '添加SKU成功' })
        this.close('save')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
