<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column
        prop="name"
        label="名称"
        sortable
        width="180"
      />
      <el-table-column
        prop="code"
        label="权限值"
        sortable
        width="180"
      />
      <el-table-column
        prop="toCode"
        label="跳转权限值"
      />
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="{row}">
          <el-button icon="el-icon-plus" type="primary" size="mini" :disabled="row.level===4" @click="add(row)" />
          <el-button icon="el-icon-edit" type="primary" size="mini" @click="edit(row)" />
          <el-button icon="el-icon-delete" type="danger" size="mini" @click="del(row)" />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="showDialog" :show-close="false">
      <el-form ref="permission" :model="permission" label-width="110px" :rules="rules">
        <el-form-item v-show="permission.level>2" label="父级名称">
          <el-input v-model="permission.pname" disabled />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="permission.name" />
        </el-form-item>
        <el-form-item label="功能权限值" prop="code">
          <el-input v-model="permission.code" />
        </el-form-item>
        <el-form-item v-show="permission.level===4" label="跳转路由权限值" prop="toCode">
          <el-input v-model="permission.toCode" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

const menuRules = {
  name: [{ required: true, message: '名称必须输入' }],
  code: [{ required: true, message: '权限值必须输入' }]
}

const btnRules = {
  name: [{ required: true, message: '名称必须输入' }],
  code: [{ required: true, trigger: 'blur', message: '功能权限值必须输入' }]
}
export default {

  data() {
    return {
      tableData: [],
      showDialog: false,
      permission: {
        pid: '',
        level: 0,
        type: 0,
        pname: '',
        name: '',
        code: '', 
        toCode: ''
      }
    }
  },
  computed: {
    title() {
      const { id, level } = this.permission
      if (id) {
        return level === 4 ? '修改功能' : '修改菜单'
      } else {
        return level === 4 ? '添加功能' : `添加${level === 2 ? '一级' : '二级'}菜单`
      }
    },
    rules() {
      return this.permission.level === 4 ? btnRules : menuRules
    }
  },
  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const result = await this.$API.permission.getPermissionList()
      if (result.code === 20000) {
        this.tableData = result.data.children
      }
    },
    async del(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', { type: 'warning' }).then(async() => {
        const result = await this.$API.permission.removePermission(row.id)
        this.$message.success(result.message || '删除成功！')
        this.init()
      }).catch(error => {
        if (error === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },
    add(row) {
      this.showDialog = true
      this.permission.pname = row.name 
      this.permission.pid = row.id 
      this.permission.level = row.level + 1
      this.permission.type = row.children.length > 0 ? 1 : 2
    },
    edit(row) {
      this.showDialog = true
      this.permission = { ...row }
    },
    cancel() {
      this.form = {}
      this.showDialog = false
    },
    submit() {
      this.$refs.permission.validate(async valid => {
        if (valid) {
          const { pname, ...perm } = this.permission
          const result = await this.$API.permission[perm.id ? 'updatePermission' : 'addPermission'](perm)
          if (result.code === 20000) {
            this.$message.success('提交成功')
            this.permission = {}
            this.init()
            this.showDialog = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
