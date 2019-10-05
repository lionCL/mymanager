<template>
  <el-breadcrumb separator-class="el-icon-arrow-right"
                 class="my-bread">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{first}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{second}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{third}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  //菜单由使用的父组件来决定
  props: ['first', 'second', 'third']
}
</script>

<style lang="less" scoped>
.my-bread {
  background-color: #d3dce6;
  height: 45px;
  line-height: 45px;
  padding-left: 15px;
}
</style>