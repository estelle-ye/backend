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
              <template slot-scope="{ row, $index }">
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
      // 添加/修改的属性信息
      attrInfo: {
        attrName: '', // 属性名
        attrValueList: [
          // 属性值
          //   {
          //     attrId: 0, //属性的id
          //     valueName: "", //属性值
          //   },
        ],
        categoryId: 0, // category3Id
        categoryLevel: 3
      }
    }
  },

  mounted() {},

  methods: {
    // 子给父传参 自定义事件的回调函数
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
    // 编辑页面 点击添加属性按钮触发事件
    changeAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, // 对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值，新增属性值的时候，需要把已有的属性的id带上
        valueName: '', // 属性值
        // 当前flag属性，响应式数据（数据变化视图跟着变化）
        flag: true
      })
    },
    // 点击添加按钮
    addAttr() {
      this.showTable = false
      // 先清空，并收集3集分类id
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    // 点击修改按钮
    updateAttr(row) {
      this.showTable = false
      // row对象嵌套对象，需要深拷贝
      this.attrInfo = JSON.parse(JSON.stringify(row))
      // flag属性：给每一个属性值添加一个标记flag，用户切换查看模式与编辑模式，好处，每一个属性值可以控制自己的模式切换
      this.attrInfo.attrValueList.forEach((item) => {
        // 给响应式对象添加属性不能用item.flag=false，会导致vue渲染无法跟随属性值变化
        this.$set(item, 'flag', false)
      })
      console.log(this.attrInfo)
    },
    toLook(row) {
      // 失去焦点时，判断内容是否符合要求
      // 1.不能为空
      if (row.valueName.trim() === '') {
        this.$message('属性值不能为空')
        return
      }
      // 2.不能重复
      const isRepeat = this.attrInfo.attrValueList.some((item) => {
        // 需要将row从数组里面判断的时候去除
        // row最新新增的属性值【数组的最后一项元素】
        // 判断的时候，需要把已有的数组当中新增的这个属性值去除
        if (row !== item) {
          return row.valueName === item.valueName
        }
      })
      // 如果有重复，则return终止执行
      if (isRepeat) {
        this.$message('属性值已存在，无法重复提交')
        return
      }
      row.flag = false
    },
    toEdit(row, index) {
      row.flag = true
      // 自动获取焦点
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 保存按钮：进行添加属性或者修改属性的操作
    async submit() {
      // 1.属性值为空不可提交服务器
      // 2.需要将flag属性去掉再提交服务器
      this.attrInfo.attrValueList = await this.attrInfo.attrValueList.filter(
        (item) => {
          // 将不为空的属性名筛选出来，并去掉flag属性
          if (item.valueName !== '') {
            delete item.flag
            return true
          }
        }
      )

      try {
        // 发请求

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
    // 删除属性名
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
    // 删除属性值
    deleteAttrValue(index) {
      // 当前删除属性值的操作是不需要发请求的
      this.attrInfo.attrValueList.splice(index, 1)
    }
  }
}
</script>

<style scoped>
</style>
