<template>
  <div>
    <!-- 面包屑 -->
    <bread first='用户管理'
           second='用户列表'></bread>
    <!-- 输入搜索栏 -->
    <el-row>
      <el-col :span="6"
              class="">
        <el-input placeholder="请输入内容"
                  v-model.trim="searchParams.query"
                  class="input-with-select">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="handleSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="18">
        <el-button type="success"
                   plain
                   @click="addUserDialogVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData"
              style="width: 100%"
              border
              v-loading='loading'>
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column property="username"
                       label="姓名"
                       width="100">
      </el-table-column>
      <el-table-column property="email"
                       label="邮箱">
      </el-table-column>
      <el-table-column property="mobile"
                       label="电话">
      </el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          {{scope.row.create_time*1000 | fmtDate('YYYY-MM-DD')}}
        </template>
      </el-table-column>
      <!-- 自定义列 -->
      <el-table-column label="用户状态"
                       width="100">

        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <!-- 自定义列 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     plain
                     size="mini"
                     @click="handelEdit(scope.row.id)"></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     plain
                     size="mini"
                     @click="handelDelte(scope.row.id)"></el-button>
          <el-button type="warning"
                     icon="el-icon-check"
                     plain
                     size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="searchParams.pagenum"
                   :page-sizes="[5, 10, 15, 20]"
                   :page-size="searchParams.pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>

    <!-- 添加用户 -->
    <el-dialog title="添加用户"
               :visible.sync="addUserDialogVisible">
      <!-- form表单区域 -->
      <el-form :model="addForm"
               :rules="rules"
               ref="addForm">
        <el-form-item label="用户名"
                      prop="username"
                      label-width="120px">
          <el-input v-model="addForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      label-width="120px"
                      prop="password">
          <el-input v-model="addForm.password"
                    autocomplete="off"
                    show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      label-width="120px"
                      prop='email'>
          <el-input v-model="addForm.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话"
                      label-width="120px"
                      prop="mobile">
          <el-input v-model="addForm.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitAddData('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户"
               :visible.sync="editUserDialogVisible">
      <!-- form表单区域 -->
      <el-form :model="editForm"
               :rules="rules">
        <el-form-item label="用户名"
                      prop="username"
                      label-width="120px">
          <el-input v-model="editForm.username"
                    autocomplete="off"
                    disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码"
                      label-width="120px">
          <el-input v-model="addForm.password"
                    autocomplete="off"
                    show-password></el-input>
        </el-form-item> -->
        <el-form-item label="邮箱"
                      label-width="120px">
          <el-input v-model="editForm.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话"
                      label-width="120px">
          <el-input v-model="editForm.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitEditData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//导入面包屑组件
import bread from '@/components/breadcrumb.vue'
//导入获取用户api
import { getUsers, delUser, addUser, getUserInfo, updateUserInfo } from '@/api/user.js'

export default {
  name: 'users',
  data() {
    return {
      //表格数据
      tableData: [
        {
          email: '2016-05-02',
          username: '王小虎',
          mobile: '上海市普陀区金沙江路 1518 弄'
        },
        {
          email: '2016-05-04',
          username: '王小虎',
          mobile: '上海市普陀区金沙江路 1517 弄'
        },
        {
          email: '2016-05-01',
          username: '王小虎',
          mobile: '上海市普陀区金沙江路 1519 弄'
        },
        {
          email: '2016-05-03',
          username: '王小虎',
          mobile: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      //表格总数据
      total: 0,
      //表格加载动画
      loading: false,
      //查询参数对象
      searchParams: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },

      //添加用户弹框是否显示
      addUserDialogVisible: false,
      //添加用户form表格数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      //表单验证规则:
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'change' }
        ],
        email: [
          { required: false, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: false, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度11个字符', trigger: 'change' }
        ]
      },

      //编辑用户弹窗是否显示
      editUserDialogVisible: false,
      //编辑用户form表格数据
      editForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    //获取用户数据方法
    async loadUser() {
      this.loading = true
      try {
        let res = await getUsers(this.searchParams)
        // console.log(res)
        if (res.meta.status === 200) {
          this.tableData = res.data.users
          this.total = res.data.total
          this.loading = false
        } else {
          this.$message.error(res.meta.msg)
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    //页码改变事件
    handleSizeChange(page) {
      this.searchParams.pagenum = page
      this.loadUser()
    },
    //页容量改变事件
    handleCurrentChange(size) {
      //改变页容量
      this.searchParams.pagesize = size
      //数据从第一页开始重新显示
      this.searchParams.pagenum = 1
      //重新获取数据
      this.loadUser()
    },
    //搜索功能
    handleSearch() {
      this.loadUser()
    },
    //删除用户
    handelDelte(id) {
      this.$confirm('用否确认删除用户', '用户删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // console.log(id)
          let res = await delUser(id)
          // console.log(res)
          if (res.meta.status === 200) {
            this.searchParams.pagenum = 1
            this.loadUser()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.meta.msg)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async handelEdit(id) {
      //弹出编辑框
      this.editUserDialogVisible = true
      let res = await getUserInfo(id)
      // console.log(res)
      this.editForm = res.data
      // console.log(this.editForm.id)
    },
    //新增用户
    submitAddData(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let res = await addUser(this.addForm)
            // console.log(res)
            if (res.meta.status === 201) {
              this.addUserDialogVisible = false
              // 清空表单数据
              for (const key in this.addForm) {
                this.addForm[key] = ''
              }
              //提示信息
              this.$message.success('创建用户成功')
              //重新加载数据
              this.loadUser()
            } else {
              this.$message.error(res.meta.msg)
            }
          } catch (error) {
            this.$message.error(error.message)
          }
        } else {
          return false
        }
      })
    },
    //编辑用户
    async submitEditData() {
      try {
        let res = await updateUserInfo(this.editForm)
        console.log(res)
        if (res.meta.status === 200) {
          //关闭窗口
          this.editUserDialogVisible = false
          this.$message.success(res.meta.msg)
          //重新加载数据
          this.loadUser()
        } else {
          this.$message.error(res.meta.msg)
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  },
  mounted() {
    this.loadUser()
  },
  components: {
    bread
  }
}
</script>

<style lang="less" scoped>
</style>