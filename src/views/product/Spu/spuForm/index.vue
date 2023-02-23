<template>
  <div>
    <el-form ref="ruleForm" label-width="80px" :model="spu" :rules="rules">
      <el-form-item label="SPU名称" prop="spuName">
        <el-input v-model="spu.spuName" placeholder="请输入SPU名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择">
          <el-option
            v-for="(item, index) in tradeMarkList"
            :key="index"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述" prop="description">
        <el-input
          v-model="spu.description"
          type="textarea"
          :rows="4"
          placeholder="请输入SPU描述"
        />
      </el-form-item>
      <el-form-item label="SPU图片">
        <!--
        file-list 照片墙需要展示的数据【数组：数组里面的元素务必要有name、url属性】
        on-preview：图片预览功能
        on-success：图片上传成功回调-->

        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性" style="display: inline-block">
        <el-select
          v-model="attrIdAndAttrName"
          style="margin-right: 20px"
          :placeholder="`还有${unSelectSaleAttr.length}项未选择`"
        >
          <el-option
            v-for="(item, index) in unSelectSaleAttr"
            :key="index"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          />
        </el-select>
      </el-form-item>
      <el-button
        icon="el-icon-plus"
        type="primary"
        @click="addSaleAttr"
      >添加销售属性</el-button>
      <el-table border style="margin-bottom: 20px" :data="spu.spuSaleAttrList">
        <el-table-column
          label="序号"
          width="80px"
          type="index"
        />
        <el-table-column label="属性名" prop="saleAttrName" />
        <el-table-column label="属性值名称">
          <template slot-scope="{row}">
            <el-tag
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="index"
              closable
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >{{ item.saleAttrValueName }}</el-tag>
            <!--添加属性值名称 用span和input切换-->
            <el-input
              v-if="row.inputVisible"
              v-model="row.inputValue"
              @blur="handleInputConfirm(row)"
            />
            <el-button
              v-else
              size="small"
              @click="addSaleAttrValue(row)"
            >添加</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ $index }">
            <el-button
              icon="el-icon-delete"
              type="danger"
              @click="deleteSaleAttr($index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
      <el-button @click="close('cancel')">取消</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      tradeMarkList: [],
      unSelectSaleAttrList: [], // 未选择的销售属性
      saleAttrList: [],
      spuImageList: [], // 存储SPU图片的数据,展示在照片墙上
      attrIdAndAttrName: '', // 收集新增的销售属性{id：,name:}-----
      spu: {
        // 用于提交服务器的数据
        spuId: '',
        category3Id: '',
        spuName: '',
        id: '',
        description: '',
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ]
      },
      // 表单验证
      rules: {
        spuName: [{ required: true, message: '必填' }],
        description: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {
    // 计算出还未选择的销售属性
    // filter方法可以从已有的数组当中过滤出用户需要的元素，并未返回一个新的数据
    // every数组的方法，会返回一个布尔值【真，假的】
    unSelectSaleAttr() {
      const result = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item1.saleAttrName !== item.name
        })
      })
      return result
    }
  },

  mounted() {},

  methods: {
    // 父组件通知子组件触发initSpuDate事件初始化SPU信息
    async initSpuDate(row) {
      // 1.获取SPU基本信息
      const spuResult = await this.$API.spu.reqSpu(row.id)
      if (spuResult.code === 200) {
        this.spu = spuResult.data
      }
      // 2.获取spu图片的数据
      const spuImageResult = await this.$API.spu.reqSpuImageList(row.id)
      if (spuImageResult.code === 200) {
        const arr = spuImageResult.data
        arr.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = arr
      }
      // 3.获取品牌的信息
      const tradeMarkResult = await this.$API.spu.reqTrademarkList()
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      // 4.获取平台全部的销售属性...此处没做接口，暂时写死
      this.saleAttrList = [
        { id: 1, name: '颜色' },
        { id: 2, name: '版本' },
        { id: 3, name: '尺码' }
      ]
      // 5.获取该spu的销售属性
      const saleResult = await this.$API.spu.reqSpuSaleAttrList(row.id)
      if (saleResult.code === 200) {
        this.spu.spuSaleAttrList = saleResult.data
      }
    },
    // 删除图片回调
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    // 上传图成功回调
    handleSuccess(response, file, fileList) {
      // 收集图片的信息
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 关闭SPU表格
    close(flag) {
      // 通知父组件触发changeScene函数，并传参flag,告诉父组件时取消还保存，如果是保存，需要重新获取数据刷新页面
      this.$emit('changeScene', {
        flag: flag
      })
      // 清数据
      // Object.assign(a,b) 是es6中新增的方法，可以合并对象，将b合并到a中
      // 组件实例this._data,可以操作data当中响应式数据
      // this.$options可以获取配置对象，配置对象的data函数执行后会返回空对象
      Object.assign(this._data, this.$options.data())
    },
    // 父组件通知子组件触发addSpuData 添加SPU信息
    async addSpuData(category3Id) {
      // 添加SPU的时候收集三级分类的id
      this.spu.category3Id = category3Id
      // 获取品牌的信息
      const tradeMarkResult = await this.$API.spu.reqTrademarkList()
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      // 获取平台全部的销售属性...此处没做接口，暂时写死
      this.saleAttrList = [
        { id: 1, name: '颜色' },
        { id: 2, name: '版本' },
        { id: 3, name: '尺码' }
      ]
    },
    // 点击添加销售属性按钮触发
    addSaleAttr() {
      // 把收集到的销售属性数据进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')
      const newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      // 向SPU对象的spuSaleAttrList属性里面添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr)
      // 清空数据
      this.attrIdAndAttrName = ''
    },
    // 点击添加属性值名称
    addSaleAttrValue(row) {
      // 点击销售属性值当中添加按钮的时候，需要有button变为input,通过当前销售属性的inputVisible控制
      // 挂载在销售属性身上的响应式数据inputVisible，控制button与input切换
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    // 属性值名称input输入框失去焦点时触发
    handleInputConfirm(row) {
      // 结构出收集到的属性数据
      const { baseSaleAttrId, inputValue } = row
      // 新增的销售属性值的名称不能为空
      if (inputValue.trim() === '') {
        this.$set(row, 'inputVisible', false)
        return
      }
      // 属性值不能重复
      const result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName !== inputValue
      )
      if (!result) {
        this.$message('属性值重复')
        return
      }
      // 新增的销售属性值
      const newValue = { baseSaleAttrId, saleAttrValueName: inputValue }
      // 新增
      row.spuSaleAttrValueList.push(newValue)
      // 修改inputVisible为false,切换为button
      this.$set(row, 'inputVisible', false)
    },
    // 删除销售属性
    deleteSaleAttr(index) {
      this.spu.spuSaleAttrList.splice(index, 1)
    },
    // 保存整个表格
    async addOrUpdateSpu() {
      // 1.表单验证，全部成功才执行提交，否则return false
      this.$refs.ruleForm.validate(async(success) => {
        if (success) {
          // 2.需要整理照片墙的数据,图片需要携带imgName与imgUrl字段
          //  map方法创建一个新数组，其结果是原数组的每个元素都调用一个指定函数后返回的结果
          this.spu.spuImageList = this.spuImageList.map((item) => {
            return {
              imgName: item.name,
              imgUrl: (item.response && item.response.data) || item.url
            }
          })
          // 3.发请求
          const result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 4.跳转回父组件
            this.close('save')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
