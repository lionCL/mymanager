<template>
  <el-breadcrumb separator-class="el-icon-arrow-right"
                 class="my-bread">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.my-bread {
  background-color: #d3dce6;
  height: 45px;
  line-height: 45px;
  padding-left: 15px;
}
</style>