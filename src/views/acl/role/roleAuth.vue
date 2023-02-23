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
      selected: []// 收集用户拥有的权限ID
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    // 初始化
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
        // 获取拥有的权限id
        this.getCheckedId(allPermission)
        // 将拥有的权限id显示到tree上
        this.$refs.tree.setCheckedKeys(this.selected)
      })
    },

    /*
      得到所有选中的id列表
      */
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
    // 提交权限分配
    async submitChecked() {
      var ids = this.$refs.tree.getCheckedKeys().join(',')
      console.log(ids)
      /*
      element-ui的tree模型不会自动传回父节点的id，所以要通过以下方法获取父节点
      方法一:
        vue elementUI tree树形控件获取父节点ID的实例
        修改源码:
        情况1: element-ui没有实现按需引入打包
          node_modules\element-ui\lib\element-ui.common.js    25382行修改源码  去掉 'includeHalfChecked &&'
          // if ((child.checked || includeHalfChecked && child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
          if ((child.checked || child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
        情况2: element-ui实现了按需引入打包
          node_modules\element-ui\lib\tree.js    1051行修改源码  去掉 'includeHalfChecked &&'
          // if ((child.checked || includeHalfChecked && child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
          if ((child.checked || child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {

        */
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

    // 清空所有选项
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>

