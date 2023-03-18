<template>
  <div>
    <el-input
      v-model="searchObj.username"
      placeholder="请输入查询内容"
      clearable
      style="width: 300px; margin-right: 15px"
    />
    <el-button
      icon="el-icon-search"
      type="primary"
      size="small"
      @click="getPageList()"
    >查询</el-button>
    <el-button size="small" @click="clean">清空</el-button>

    <div class="main">
      <el-button
        type="primary"
        size="small"
        @click="dialogFormVisible = true"
      >添加</el-button>
      <el-popconfirm
        title="确认删除这些用户吗？"
        @onConfirm="dels()"
      >
        <el-button
          slot="reference"
          type="danger"
          size="small"
          :disabled="multipleSelection.length===0?true:false"
          style="margin-left:10px;"
        >批量删除</el-button>
      </el-popconfirm>
      <el-table
        ref="multipleTable"
        stripe
        tooltip-effect="dark"
        style="width: 100%; margin-top: 20px"
        border
        :data="users"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          label="序号"
          width="120"
          type="index"
          :index="calcIndex"
        />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="nickName" label="用户昵称" width="120" />
        <el-table-column prop="roleName" label="身份" show-overflow-tooltip />
        <el-table-column prop="gmtCreate" label="创建时间" width="180" />
        <el-table-column prop="gmtModified" label="更新时间" width="180" />
        <el-table-column label="操作" align="center" width="230">
          <template slot-scope="{ row }">
            <el-button
              icon="el-icon-user"
              size="mini"
              type="info"
              title="分配角色"
              @click="assignRoles(row)"
            />
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="primary"
              title="修改"
              @click="showDialog(row)"
            />
            <el-popconfirm title="确认删除该用户吗？" @onConfirm="del(row)">
              <el-button
                slot="reference"
                icon="el-icon-delete"
                size="mini"
                type="danger"
                title="删除"
                style="margin-left: 10px"
              />
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page.sync="page"
          :page-size="limit"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="getPageList"
        />
      </div>
    </div>

    <!-- 对话框 添加/修改 -->
    <el-dialog
      :title="form.id ? '修改用户' : '新增用户'"
      :visible.sync="dialogFormVisible"
      :show-close="false"
    >
      <el-form ref="userForm" :model="form" label-width="80px" :rules="userRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="用户昵称" pro-nick-name->
          <el-input v-model="form.nickName" />
        </el-form-item>
        <el-form-item v-if="!form.id" label="用户密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 对话框 修改用户角色 -->
    <el-dialog
      title="设置角色"
      :visible.sync="showRoles"
      :show-close="false"
      width="550px"
    >
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" disabled />
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox-group v-model="userRolesIds">
            <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id">{{ role.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" :disabled="userRolesIds.length>0?false:true" @click="submitRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      page: 1, 
      limit: 5, 
      searchObj: {
         username: ''
      },
      users: [],
      total: 0,
      multipleSelection: [],
      dialogFormVisible: false,
      showRoles: false,
      form: {
        username: '',
        nickName: '',
        password: ''
      },
      userRules: {
        username: [
          { required: true, message: '必填' },
          { min: 4, message: '用户名不能小于4位' }
        ],
        password: [
          { required: true, validator: this.validatePassword }
        ]
      },
      allRoles: [], 
      userRolesIds: [], 
      userInfo: {}
    }
  },

  mounted() {
    this.getPageList()
  },

  methods: {
    
    async getPageList(page = 1) {
      this.page = page
      const { limit, searchObj } = this
      const result = await this.$API.user.getPageList(page, limit, searchObj)
      const { items, total } = result.data
      
      this.users = items.filter((item) => item.username !== 'admin')
      this.total = total - 1
    },

    
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    
    calcIndex(index) {
      return (this.page - 1) * this.limit + index + 1
    },
    
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    
    clean() {
      this.searchObj = {}
      this.getPageList()
    },
    
    showDialog(row) {
      this.form = row
      this.dialogFormVisible = true
    },
    
    async assignRoles(row) {
      
      const result = await this.$API.user.getRoles(row.id)
      const { allRolesList, assignRoles } = result.data
      this.allRoles = allRolesList
      this.userRolesIds = assignRoles.map(items => items.id)
      this.userInfo = row
      this.showRoles = true
    },
    
    async submitRoles() {
      const rolesIds = this.userRolesIds.toString()
      console.log(rolesIds)
      const result = await this.$API.user.assignRoles(this.userInfo.id, rolesIds)
      if (result.code === 20000) {
        this.$message.success('分配成功')
        this.userRolesIds = []
        this.userInfo = []
        this.showRoles = false
      }
    },

    
    cancel() {
      this.form = {}
      this.userInfo = []
      this.userRolesIds = []
      this.showRoles = false
      this.dialogFormVisible = false
      this.getPageList(this.page)
    },
    
    addOrUpdate() {
      
      this.$refs.userForm.validate(valid => {
        if (valid) {
          const { form } = this
          this.$API.user[form.id ? 'update' : 'add'](form).then((result) => {
            if (result.code === 20000) {
              this.$message.success('保存成功')
              this.getPageList(form.id ? this.page : 1)
              this.form = {}
              this.dialogFormVisible = false
            } else {
              this.$message.err('提交失败')
              this.form = {}
              this.dialogFormVisible = false
            }
          })
        }
      })
    },
    
    async del(row) {
      const result = await this.$API.user.removeById(row.id)
      if (result.code === 20000) {
        this.$message.success('删除成功')
        this.getPageList(this.page)
      } else {
        this.$message.error('删除失败')
      }
    },
    
    async dels() {
      const arr = []
      this.multipleSelection.forEach(item => {
        arr.push(item.id)
      })
      const result = await this.$API.user.removeUsers(arr)
      if (result.code === 20000) {
        this.$message.success('删除成功')
        this.getPageList(this.page)
      } else {
        this.$message.error('删除失败')
      }
    },

    
    validatePassword(rule, value, callback) {
      if (!value) {
        callback('必填')
      } else if (!value || value.length < 6) {
        callback('密码不能小于6位')
      } else {
        callback()
      }
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 40px;
}
</style>
