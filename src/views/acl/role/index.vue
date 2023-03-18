<template>
  <div>
    <div class="header">
      <el-input v-model="searchObj.roleName" placeholder="角色名称" style="width:200px;margin-right:10px" clearable />
      <el-button size="small" type="primary" :disabled="!searchObj" @click="getPageList">搜索</el-button>
      <el-button size="small" @click="clearAll">清空</el-button>
    </div>
    <div class="main">
      <el-button type="primary" size="small" style="margin-right:10px" @click="showDialog = true">添加</el-button>
      <el-popconfirm
        title="确认批量删除选中角色吗？"
        @onConfirm="dels()"
      >
        <el-button slot="reference" :disabled="multipleSelection.length===0" type="danger" size="small">批量删除</el-button>
      </el-popconfirm>
      <el-table
        v-loading="loading"
        style="width: 100%;margin-top:20px;"
        border
        :data="roles"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="序号"
          width="80"
          type="index"
          align="center"
          :index="calcIndex"
        />
        <el-table-column
          label="角色名称"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <div v-if="userRole.id===row.id" style="display:flex">
              <el-input v-model="userRole.roleName" />
              <el-button icon="el-icon-check" type="primary" style="margin-left:20px" @click="submit">确认</el-button>
              <el-button icon="el-icon-refresh" type="warning" style="margin-left:20px" @click="userRole={}">取消</el-button>
            </div>
            <div v-else>
              <span>{{ row.roleName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="230"
          align="center"
        >
          <template slot-scope="{row}">
            <el-button icon="el-icon-user-solid" size="mini" title="分配权限" type="info" @click="$router.push(`/acl/role/auth/${row.id}?roleName=${row.roleName}`)" />
            <el-button icon="el-icon-edit" size="mini" title="修改角色" type="primary" style="margin-right:10px" @click="edit(row)" />
            <el-popconfirm
              title="确认删除该角色吗？"
              @onConfirm="del(row)"
            >
              <el-button slot="reference" icon="el-icon-delete" size="mini" title="删除" type="danger" />
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="page"
        :page-size="limit"
        layout="prev, pager, next, jumper"
        :total="allRoleslength"
        @current-change="getPageList"
      />
    </div>

    <!--对话框  添加/修改角色-->
    <el-dialog title="新增角色" :visible.sync="showDialog" :show-close="false" width="320px">
      <span>请输入新名称</span>
      <el-input v-model="userRole.roleName" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchObj: {
        roleName: ''
      },
      page: 1,
      limit: 6,
      loading: false, 
      roles: [],
      allRoleslength: 0,
      showDialog: false,
      multipleSelection: [], 
      userRole: {
        roleName: ''
      }

    }
  },

  mounted() {
    this.getPageList()
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    
    calcIndex(index) {
      return (this.page - 1) * this.limit + index + 1
    },
    
    async getPageList() {
      this.loading = true
      const { page, limit, searchObj } = this
      const result = await this.$API.role.getPageList(page, limit, searchObj)
      if (result.code === 20000) {
        this.roles = result.data.items
        this.allRoleslength = result.data.total
        this.loading = false
      } else {
        this.$message.error('获取角色信息失败')
        this.loading = false
      }
    },
    
    clearAll() {
      this.searchObj = {}
      this.getPageList()
    },
    
    cancel() {
      this.showDialog = false
      this.userRole = {}
    },
    
    async submit() {
      const result = await this.$API.role[this.userRole.id ? 'updateById' : 'save'](this.userRole)
      if (result.code === 20000) {
        this.$message.success('提交成功')
        this.showDialog = false
        this.userRole = {}
        this.getPageList()
      } else {
        this.$message.error('提交失败')
      }
    },
    
    edit(row) {
      
      const text = JSON.stringify(row)
      const obj = JSON.parse(text)
      this.userRole = obj
    },
    
    async del(row) {
      const result = await this.$API.role.removeById(row.id)
      if (result.code === 20000) {
        this.$message.success('删除成功')
        this.getPageList()
      }
    },
    
    async dels() {
      const arr = this.multipleSelection.map(items => items.id)
      const result = await this.$API.role.removeRoles(arr)
      if (result.code === 20000) {
        this.$message.success('删除成功')
        this.multipleSelection = []
        this.getPageList()
      }
    }
  }
}
</script>

<style scoped>
.header{
  display:flex
}
.main{
  margin-top:20px;
}
</style>
