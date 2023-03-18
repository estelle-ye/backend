<template>
  <div>
    <el-button v-show="$store.state.user.buttons.indexOf('btn.test1')!=-1">测试按钮1</el-button>
    <el-button v-show="$store.state.user.buttons.indexOf('btn.test2')!=-1">测试按钮2</el-button>
  </div>
</template>

<script>
export default {
  name: 'VueAdminTemplateMasterIndex',

  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
