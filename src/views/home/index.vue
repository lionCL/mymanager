<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="@/assets/imgs/logo.png"
               alt=""
               class="logo">
        </el-col>
        <el-col :span="16">
          <div class="title">电商后台管理系统</div>
        </el-col>
        <el-col :span="4">
          <a href="#"
             class="loginout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧栏 -->
      <el-aside class="aside"
                width="200px">Aside</el-aside>
      <!-- main -->
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home'
}
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  .header {
    background-color: #b3c0d1;
    padding: 0;
    color: #333;
    text-align: center;
    line-height: 60px;
    .logo {
      margin-right: 40px;
      height: 50px;
    }
    .title {
      color: #fff;
      font-size: 24px;
    }
    .loginout {
      position: absolute;
      right: 20px;
      font-size: 14px;
      color: orange;
    }
  }
  .aside {
    background-color: #d3dce6;
  }
  .main {
    background-color: #e9eef3;
    height: 100%;
  }
}
</style>