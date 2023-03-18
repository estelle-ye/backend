<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :show="!showTable" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <!-- 普通表格 -->
      <div v-show="showTable">
        <el-button
          type="primary"
          :disabled="!category3Id"
          icon="el-icon-plus"
          @click="addAttr"
        >添加</el-button>
        <el-table style="width: 100%; margin: 20px 0" border :data="attrList">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          />
          <el-table-column label="属性值名称" width="150">
            <template slot-scope="{ row}">
              <span>{{ row.attrName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="属性值列表">
            <template slot-scope="{ row}">
              <el-tag
                v-for="(item, index) in row.attrValueList"
                :key="index"
                type="success"
                style="margin: 1px 5px"
              >{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                size="small"
                icon="el-icon-edit"
                @click="updateAttr(row)"
              >修改</el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="deleteAttr(row, $index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加表格 -->
      <div v-show="!showTable">
        <el-form label-width="80px" :inline="true">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            :disabled="!attrInfo.attrName"
            @click="changeAttrValue"
          >添加属性值</el-button>
          <el-button @click="showTable = true">取消</el-button>
          <el-table
            border
            style="width: 100%; margin: 20px 0px"
            :data="attrInfo.attrValueList"
          >
            <el-table-column label="序号" width="80px" type="index" />
            <el-table-column label="属性值">
              <template slot-scope="{ row, $index }">
                <el-input
                  v-if="row.flag"
                  :ref="$index"
                  v-model="row.valueName"
                  size="small"
                  placeholder="请输入属性值"
                  @blur="toLook(row)"
                />
                <span
                  v-else
                  style="display: block"
                  @click="toEdit(row, $index)"
                >{{ row.valueName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ $index }">
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="deleteAttrValue($index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            :disabled="this.attrInfo.attrValueList.length == 0"
            @click="submit"
          >保存</el-button>
          <el-button @click="showTable = true">取消</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Attr',
  data() {
    return {
      attrList: [],
      showTable: true,
      category1Id: '',
      category2Id: '',
      category3Id: '',
      
      attrInfo: {
        attrName: '', 
        attrValueList: [
          
          
          
          
          
        ],
        categoryId: 0, 
        categoryLevel: 3
      }
    }
  },

  mounted() {},

  methods: {
    
    getCategoryId(categoryId) {
      const { category1Id, category2Id, category3Id } = categoryId
      this.category3Id = category3Id
      this.category2Id = category2Id
      this.category1Id = category1Id
      this.getCategory()
    },
    async getCategory() {
      const result = await this.$API.attr.reqAttrList(
        this.category1Id,
        this.category2Id,
        this.category3Id
      )
      if (result.code === 200) {
        this.attrList = result.data
      }
    },
    
    changeAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, 
        valueName: '', 
        
        flag: true
      })
    },
    
    addAttr() {
      this.showTable = false
      
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    
    updateAttr(row) {
      this.showTable = false
      
      this.attrInfo = JSON.parse(JSON.stringify(row))
      
      this.attrInfo.attrValueList.forEach((item) => {
        
        this.$set(item, 'flag', false)
      })
      console.log(this.attrInfo)
    },
    toLook(row) {
      
      
      if (row.valueName.trim() === '') {
        this.$message('属性值不能为空')
        return
      }
      
      const isRepeat = this.attrInfo.attrValueList.some((item) => {
        
        
        
        if (row !== item) {
          return row.valueName === item.valueName
        }
      })
      
      if (isRepeat) {
        this.$message('属性值已存在，无法重复提交')
        return
      }
      row.flag = false
    },
    toEdit(row, index) {
      row.flag = true
      
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    
    async submit() {
      
      
      this.attrInfo.attrValueList = await this.attrInfo.attrValueList.filter(
        (item) => {
          
          if (item.valueName !== '') {
            delete item.flag
            return true
          }
        }
      )

      try {
        

        const result = await this.$API.attr.reqAddorUpdateAttr(this.attrInfo)
        if (result.code === 200) {
          this.showTable = true
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.getCategory()
        }
      } catch (err) {
        this.$message({
          message: '保存失败',
          type: 'error'
        })
      }
    },
    
    async deleteAttr(row, index) {
      const result = await this.$API.attr.reqDeleteAttr(row.id)
      if (result.code === 200) {
        this.attrList.splice(index, 1)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
    },
    
    deleteAttrValue(index) {
      
      this.attrInfo.attrValueList.splice(index, 1)
    }
  }
}
</script>

<style scoped>
</style>
