<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="formInline.category1Id" placeholder="请选择" @change="getCategory2List">
          <el-option
            v-for="(item,index) in category1List"
            :key="index"
            :label="item.name"
            :value="item.id"
            :disabled="show"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="formInline.category2Id" placeholder="请选择" @change="getCategory3List">
          <el-option
            v-for="(item,index) in category2List"
            :key="index"
            :label="item.name"
            :value="item.id"
            :disabled="show"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="formInline.category3Id" placeholder="请选择" @change="handel">
          <el-option
            v-for="(item,index) in category3List"
            :key="index"
            :label="item.name"
            :value="item.id"
            :disabled="show"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['show'],
  data() {
    return {
      category1List: [],
      category2List: [],
      category3List: [],
      formInline: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },

  mounted() {
    this.getCategory1List()
  },

  methods: {
    // 获取一级组件下拉数据
    async getCategory1List() {
      const result = await this.$API.attr.reqCategory1List()
      if (result.code === 200) {
        this.category1List = result.data
      }
    },
    // 选择一级组件后,获取二级下拉菜单数据
    async getCategory2List() {
      // 首先要清除2，3级列表已选id数据
      this.formInline.category2Id = ''
      this.formInline.category3Id = ''
      const result = await this.$API.attr.reqCategory2List(this.formInline.category1Id)
      if (result.code === 200) {
        this.category2List = result.data
      }
    },
    // 选择二级组件后,获取三级下拉菜单数据
    async getCategory3List() {
      // 首先要清除3级列表已选id数据
      this.formInline.category3Id = ''
      const result = await this.$API.attr.reqCategory3List(this.formInline.category2Id)
      if (result.code === 200) {
        this.category3List = result.data
      }
    },
    // 三级组件选择后，进行子向父传参this.$emit(事件名,参数)
    handel() {
      this.$emit(
        'getCategoryId',
        {
          category1Id: this.formInline.category1Id,
          category2Id: this.formInline.category2Id,
          category3Id: this.formInline.category3Id
        }
      )
    }
  }
}
</script>

<style>
</style>
