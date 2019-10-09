<template>
  <div>
    <!-- 面包屑导航 -->
    <bread first='角色列表'
           second='权限列表'></bread>
    <!-- 添加按钮 -->
    <el-button plain>添加角色</el-button>
    <!-- 角色列表table表格 -->
    <el-table :data="tableData"
              style="width: 100%"
              border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 标题栏 -->
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column label="角色名称"
                       prop="roleName">
      </el-table-column>
      <el-table-column label="角色描述"
                       prop="roleDesc">
      </el-table-column>
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
  </div>
</template>

<script>
//导入面包屑组件
import bread from '@/components/breadcrumb.vue'
//导入api
import { getUserRole } from '@/api/user.js'

export default {
  name: 'roles',
  data() {
    return {
      //表格数据
      tableData: [
        {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }
      ]
    }
  },
  methods: {
    //数据加载
    async loadRoles() {
      let res = await getUserRole()
      if (res.meta.status === 200) {
        console.log(res)
        this.tableData = res.data
      } else {
        this.$message.error(res.meta.msg)
      }
    }
  },
  created() {
    this.loadRoles()
  },
  components: {
    bread
  }
}
</script>

<style>
</style>