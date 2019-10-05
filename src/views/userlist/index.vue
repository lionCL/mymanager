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
                   plain>添加用户</el-button>
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
          {{scope.row.create_time | fmtDate('YYYY-MM-DD')}}
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
                     size="mini"></el-button>
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
  </div>
</template>

<script>
//导入面包屑组件
import bread from '@/components/breadcrumb.vue'
//导入获取用户api
import { getUsers, delUser } from '@/api/user.js'
import { async } from 'q'

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
      //查询参数对象
      searchParams: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      //表格总数据
      total: 0,
      //表格加载动画
      loading: false
    }
  },
  methods: {
    //获取用户数据方法
    async loadUser() {
      this.loading = true
      try {
        let res = await getUsers(this.searchParams)
        console.log(res)
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
          console.log(id)

          let res = await delUser(id)

          console.log(res)
          if (res.meta.status === 200) {
            this.searchParams.pagenum = 1
            this.loadUser()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.meta.msg)
          }
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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