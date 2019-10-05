<template>
  <div>
    <!-- 面包屑 -->
    <bread></bread>
    <!-- 输入搜索栏 -->
    <el-row>
      <el-col :span="6"
              class="">
        <el-input placeholder="请输入内容"
                  v-model="input3"
                  class="input-with-select">
          <el-button slot="append"
                     icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="18">
        <el-button type="success"
                   plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData"
              @current-change="handleCurrentChange"
              style="width: 100%"
              border>
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column property="username"
                       label="姓名"
                       width="120">
      </el-table-column>
      <el-table-column property="email"
                       label="邮箱">
      </el-table-column>
      <el-table-column property="mobile"
                       label="电话">
      </el-table-column>
      <!-- 自定义列 -->
      <el-table-column label="用户状态"
                       width="100">

        <template slot-scope="scope">
          <el-switch v-model="value"
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
                     size="mini"></el-button>
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
                   :current-page="currentPage4"
                   :page-sizes="[100, 200, 300, 400]"
                   :page-size="100"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="400">
    </el-pagination>
  </div>
</template>

<script>
//导入面包屑组件
import bread from '@/components/breadcrumb.vue'

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
      ]
    }
  },
  components: {
    bread
  }
}
</script>

<style lang="less" scoped>
</style>