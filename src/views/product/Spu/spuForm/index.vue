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
      unSelectSaleAttrList: [], 
      saleAttrList: [],
      spuImageList: [], 
      attrIdAndAttrName: '', 
      spu: {
        
        spuId: '',
        category3Id: '',
        spuName: '',
        id: '',
        description: '',
        spuSaleAttrList: [],
        spuImageList: []
      },
      
      rules: {
        spuName: [{ required: true, message: '必填' }],
        description: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {
    
    
    
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
    
    async initSpuDate(row) {
      
      const spuResult = await this.$API.spu.reqSpu(row.id)
      if (spuResult.code === 200) {
        this.spu = spuResult.data
      }
      
      const spuImageResult = await this.$API.spu.reqSpuImageList(row.id)
      if (spuImageResult.code === 200) {
        const arr = spuImageResult.data
        arr.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = arr
      }
      
      const tradeMarkResult = await this.$API.spu.reqTrademarkList()
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      
      this.saleAttrList = [
        { id: 1, name: '颜色' },
        { id: 2, name: '版本' },
        { id: 3, name: '尺码' }
      ]
      
      const saleResult = await this.$API.spu.reqSpuSaleAttrList(row.id)
      if (saleResult.code === 200) {
        this.spu.spuSaleAttrList = saleResult.data
      }
    },
    
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    
    handleSuccess(response, file, fileList) {
      
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    
    close(flag) {
      
      this.$emit('changeScene', {
        flag: flag
      })
      
      
      
      
      Object.assign(this._data, this.$options.data())
    },
    
    async addSpuData(category3Id) {
      
      this.spu.category3Id = category3Id
      
      const tradeMarkResult = await this.$API.spu.reqTrademarkList()
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      
      this.saleAttrList = [
        { id: 1, name: '颜色' },
        { id: 2, name: '版本' },
        { id: 3, name: '尺码' }
      ]
    },
    
    addSaleAttr() {
      
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')
      const newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      
      this.spu.spuSaleAttrList.push(newSaleAttr)
      
      this.attrIdAndAttrName = ''
    },
    
    addSaleAttrValue(row) {
      
      
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    
    handleInputConfirm(row) {
      
      const { baseSaleAttrId, inputValue } = row
      
      if (inputValue.trim() === '') {
        this.$set(row, 'inputVisible', false)
        return
      }
      
      const result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName !== inputValue
      )
      if (!result) {
        this.$message('属性值重复')
        return
      }
      
      const newValue = { baseSaleAttrId, saleAttrValueName: inputValue }
      
      row.spuSaleAttrValueList.push(newValue)
      
      this.$set(row, 'inputVisible', false)
    },
    
    deleteSaleAttr(index) {
      this.spu.spuSaleAttrList.splice(index, 1)
    },
    
    async addOrUpdateSpu() {
      
      this.$refs.ruleForm.validate(async(success) => {
        if (success) {
          
          
          this.spu.spuImageList = this.spuImageList.map((item) => {
            return {
              imgName: item.name,
              imgUrl: (item.response && item.response.data) || item.url
            }
          })
          
          const result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            
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
