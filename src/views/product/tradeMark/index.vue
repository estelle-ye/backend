<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin:10px;" @click="showDialog">添加</el-button>
    <el-table style="width:100%;" border :data="list">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column label="品牌名称" align="left" prop="tmName" />
      <el-table-column label="品牌logo" align="left">
        <!--作用域插槽，row储存父组件index数据，$index是下表，可以类比v-for的作用-->
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="" style="width:100px;height:100px;">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left">
        <template slot-scope="{row}">
          <el-button type="warning" icon="el-icon-edit" size="small" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      layout="prev, pager, next, jumper"
      :page-size="limit"
      :total="total"
      style="textAlign:center;margin-top:10px;"
      :current-page="page"
      @current-change="getPageList"
    />
    <!-- dialog对话框 -->
    <el-dialog title="品牌信息" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="tmForm" style="width:80%" :rules="rules">
        <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上传品牌logo" :label-width="formLabelWidth" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    // 自定义验证规则
    const validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error('品牌名称2-10位'))
      } else {
        callback()
      }
    }
    return {
      page: 1,
      limit: 3,
      total: 0,
      list: [],
      tmName: '',
      tmForm: {
        tmName: '',
        logoUrl: '',
        id: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 表单验证规则
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { validator: validateTmName, trigger: 'change' }
        ],
        logoUrl: [{ required: true, message: '请选择品牌的图片' }]
      }
    }
  },
  mounted() {
    this.getPageList()
  },

  methods: {
    async getPageList(pager = 1) {
      this.page = pager
      // 获取品牌列表接口 目录/src/api/product/tradeMark
      const { page, limit } = this
      const result = await this.$API.trademark.reqTradeMarkList(page, limit)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },

    // 弹出对话框
    showDialog() {
      this.dialogFormVisible = true
      this.tmForm.tmName = ''
      this.tmForm.logoUrl = ''
    },

    // 更改数据
    updateTradeMark(row) {
      this.dialogFormVisible = true
      this.tmForm = { ...row }
    },

    // 删除数据
    deleteTradeMark(row) {
      // 弹框
      this.$confirm(`确定删除${row.tmName}?`, '确认信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        distinguishCancelAndClose: true
      })
        .then(async() => {
          const result = await this.$API.trademark.reqDeleteTradeMark(row.id)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getPageList()
          }
          this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 上传图片-elementui文档
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 提交品牌信息
    async addOrUpdateTradeMark() {
      // 表单验证下，全部成功才执行提交，否则return false
      this.$refs.ruleForm.validate(async(success) => {
        if (success) {
          this.dialogFormVisible = false
          const result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
          if (result.code === 200) {
            this.$message({
              message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
              type: 'success'
            })
            // 修改后停留在当前页，添加后返回第一页
            this.getPageList(this.tmForm.id ? this.page : this.page = 1)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
