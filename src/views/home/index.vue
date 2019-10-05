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
             class="loginout"
             @click.prevent="loginout">退出</a>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 侧栏 -->
      <el-aside class="aside"
                width="200px">
        <el-menu default-active="1"
                 class="menu"
                 :unique-opened="true"
                 :router="true">
          <!-- 一级目录-->
          <el-submenu v-for="(item,index) in menus"
                      :key="item.id"
                      :index="index + ''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{item.authName}}</span>
            </template>

            <!-- 二级目录 -->
            <el-menu-item v-for="subItem in item.children"
                          :key="subItem.id"
                          :index="'/'+ subItem.path">
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- main -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
//导入api
import { getMenus } from '@/api/user.js'

export default {
  name: 'home',
  data() {
    return {
      menus: []
    }
  },
  mounted() {
    //dom加载完毕后运行方法
    this.loadMenus()
  },
  methods: {
    //加载权限菜单的
    async loadMenus() {
      try {
        let res = await getMenus()
        if (res.meta.status === 200) {
          this.menus = res.data
          // console.log(this.menus)
        } else {
          this.$message.error(res.meta.msg)
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    //退出
    loginout() {
      this.$confirm('是否退出系统?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          //删除token
          window.localStorage.removeItem('token')
          //跳转到登录界面
          this.$router.push('/login')
          //提示信息
          this.$message.success('退出成功')
        })
        .catch(() => {})
    }
  }
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
    .menu {
      width: 200px;
      height: 100%;
    }
  }
  .main {
    background-color: #e9eef3;
    height: 100%;
    padding: 0 20px;
  }
}
</style>