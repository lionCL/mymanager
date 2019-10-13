<template>
  <div>
    <!-- 面包屑导航 -->
    <bread first="权限管理"
           second="权限列表"></bread>
    <!-- table表格 -->
    <el-table :data="tableData"
              highlight-current-row
              style="width: 100%"
              border
              height="600">
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column property="authName"
                       label="权限名称"
                       width="180">
      </el-table-column>
      <el-table-column property="path"
                       label="路径"
                       width="180">
      </el-table-column>
      <el-table-column property="level"
                       label="层级"
                       width="120">
        <template slot-scope='scope'>
          <span v-if="scope.row.level ==='0'">一级</span>
          <span v-if="scope.row.level ==='1'">二级</span>
          <span v-if="scope.row.level ==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import bread from '@/components/breadcrumb.vue'
//导入api
import { getAllRoles } from '@/api/user.js'
export default {
  name: 'rights',
  data() {
    return {
      //表格数据
      tableData: []
    }
  },

  async created() {
    let res = await getAllRoles('list')
    if (res.meta.status === 200) {
      console.log(res)
      this.tableData = res.data
    }
  },

  components: {
    bread
  }
}
</script>

<style lang="less">
</style>