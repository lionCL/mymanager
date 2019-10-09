<template>
  <div>
    <!-- 面包屑导航 -->
    <bread first='角色列表'
           second='权限列表'></bread>
    <!-- 添加按钮 -->
    <el-button plain
               @click="addUserDialogVisible=true">添加角色</el-button>
    <!-- 角色列表table表格 -->
    <el-table :data="tableData"
              style="width: 100%"
              border
              v-loading="loading">
      <!-- 展开栏 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 未设置权限的展示 -->
          <el-row v-if="scope.row.children.length == '0'">
            <el-col :span="24">未分配权限</el-col>
          </el-row>

          <!-- 一级权限 -->
          <el-row v-for="item1 in scope.row.children"
                  :key="item1.id"
                  class="firstMenu">
            <el-col :span="4">
              <el-tag closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!-- 二级权限 -->
            <el-col :span="20">
              <el-row v-for="item2 in item1.children"
                      :key="item2.id"
                      class="secondMenu">
                <el-col :span="4">
                  <el-tag closable>{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 三级权限 -->
                <el-col :span="20">
                  <el-tag closable
                          v-for="item3 in item2.children"
                          :key="item3.id"
                          class="thirdMenu">{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
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
                     size="mini"
                     @click="editRole(scope.row)"></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     plain
                     size="mini"
                     @click="delRole(scope.row)"></el-button>
          <el-button type="warning"
                     icon="el-icon-check"
                     plain
                     size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色弹窗 -->
    <el-dialog title="添加用户"
               :visible.sync="addUserDialogVisible">
      <!-- form表单区域 -->
      <el-form :model="addForm"
               :rules="rules"
               ref="addForm">
        <el-form-item label="角色名称"
                      prop="roleName"
                      label-width="120px">
          <el-input v-model="addForm.roleName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      label-width="120px"
                      prop="roleDesc">
          <el-input v-model="addForm.roleDesc"
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

    <!-- 编辑角色弹窗 -->
    <el-dialog title="编辑角色"
               :visible.sync="editUserDialogVisible">
      <!-- form表单区域 -->
      <el-form :model="editForm"
               :rules="rules"
               ref="editForm">
        <el-form-item label="角色名称"
                      prop="roleName"
                      label-width="120px">
          <el-input v-model="editForm.roleName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      label-width="120px"
                      prop="roleDesc">
          <el-input v-model="editForm.roleDesc"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submiteditData('editForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//导入面包屑组件
import bread from '@/components/breadcrumb.vue'
//导入api
import { getUserRole, addRole, getRoleInfo, updateRoles, deleteRole } from '@/api/user.js'

export default {
  name: 'roles',
  data() {
    return {
      //表格数据
      tableData: [],
      //数据加载动画
      loading: false,

      //添加角色form数据
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      //弹窗是否显示
      addUserDialogVisible: false,
      //添加角色表格规则
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 3 到 8 个字符', trigger: 'change' }
        ],
        roleDesc: [
          { required: false, message: '请输入角色描述信息', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'change' }
        ]
      },

      //编辑角色
      editForm: {
        rid: '',
        roleName: '',
        roleDesc: ''
      },
      //编辑弹窗是否显示
      editUserDialogVisible: false
    }
  },
  methods: {
    //数据加载
    async loadRoles() {
      this.loading = true
      let res = await getUserRole()
      if (res.meta.status === 200) {
        // console.log(res)
        this.tableData = res.data
        this.loading = false
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    //提交角色信息
    submitAddData(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await addRole(this.addForm)
          if (res.meta.status === 201) {
            this.$message.success('添加角色成功')
            //关闭弹窗
            this.addUserDialogVisible = false
            //重新加载数据
            this.loadRoles()
          } else {
            this.$message.error(res.meta.msg)
          }
        } else {
          return false
        }
      })
    },
    //显示角色信息
    async editRole(row) {
      // console.log(row)
      //显示弹窗
      this.editUserDialogVisible = true
      //发送请求获取角色信息
      let res = await getRoleInfo(row.id)
      // console.log(res)
      if (res.meta.status === 200) {
        this.editForm = res.data
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    //提交编辑角色信息
    submiteditData(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await updateRoles(this.editForm.roleId, this.editForm)
          // console.log(res)
          if (res.meta.status === 200) {
            //提示成功信息
            this.$message.success('角色更新完成')
            //关闭弹窗
            this.editUserDialogVisible = false
            //清空弹窗内容
            this.editForm = {}
            //重新加载列表数据
            this.loadRoles()
          } else {
            this.$message.error(res.meta.msg)
          }
        } else {
          return false
        }
      })
    },
    //删除角色
    delRole(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '角色删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await deleteRole(row.id)
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            //重新加载角色列表
            this.loadRoles()
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

<style lang="less" scoped>
.firstMenu {
  margin-bottom: 5px;
  .secondMenu {
    // margin-bottom: 5px;
    .thirdMenu {
      margin-bottom: 5px;
      margin-right: 1px;
    }
  }
}
</style>