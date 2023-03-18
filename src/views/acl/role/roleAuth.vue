<template>
  <div>
    <el-input disabled :value="$route.query.roleName" />
    <el-tree
      ref="tree"
      :data="allPermission"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :props="defaultProps"
    />
    <div class="buttons">
      <el-button :loading="loading" @click="submitChecked">提交</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoleAuth',

  data() {
    return {
      loading: false,
      roleId: '',
      allPermission: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selected: []
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    
    init() {
      this.loading = true
      const roleId = this.$route.params.id
      this.roleId = roleId
      this.getPermission(roleId)
      this.loading = false
    },
    /*
      获取指定角色的权限列表
    */
    async getPermission(roleId) {
      this.$API.permission.toAssign(roleId).then(result => {
        const allPermission = result.data.children
        this.allPermission = allPermission
        
        this.getCheckedId(allPermission)
        
        this.$refs.tree.setCheckedKeys(this.selected)
      })
    },
    getCheckedId(allPermission) {
      allPermission.forEach(item => {
        if (item.children.length > 0) {
          const arr = item.children
          this.getCheckedId(arr)
        } else if (item.children.length === 0) {
          if (item.select) {
            this.selected.push(item.id)
          }
        }
      })
    },
    
    async submitChecked() {
      var ids = this.$refs.tree.getCheckedKeys().join(',')
      console.log(ids)
      this.loading = true
      const result = await this.$API.permission.doAssign(this.roleId, ids)
      if (result.code === 20000) {
        this.$message.success('保存成功')
        this.$router.push(`/acl/role`)
        this.loading = false
      } else {
        this.loading = false
      }
    },

    
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>

