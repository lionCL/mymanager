<template>
  <div class="login-wrap">
    <el-form label-position="top"
             label-width="80px"
             ref="formData"
             :model="formData"
             class="login-form"
             :rules="rules">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="formData.password"
                  type="password"></el-input>
      </el-form-item>
      <el-button type="primary"
                 class="login-btn"
                 @click="doLogin('formData')">登录</el-button>
    </el-form>
  </div>
</template>

<script>
//导入登录请求api
import { userLogin } from '@/api/user'
import { async } from 'q'
export default {
  name: 'login',
  data() {
    return {
      //form表单数据
      formData: {
        username: '',
        password: ''
      },
      //规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    doLogin(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let res = await userLogin(this.formData)
            // console.log(res)
            this.$message.success('登录成功')
            //将token记录到本地存储中
            window.localStorage.setItem('token', res.token)
            //跳转路由(用name名写法)
            this.$router.push('/home')
          } catch (error) {
            this.$message.error(error.message)
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 10px;

    .login-btn {
      width: 100%;
    }
  }
}
</style>