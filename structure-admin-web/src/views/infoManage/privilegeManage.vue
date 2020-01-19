<template>
  <div class="privilege-manage-container">
    <el-container>
      <el-header height="45px" class="privilege-manage-header">
        <span>姓名：</span>
        <el-input v-model="queryName" class="query-name" size="small" clearable @clear="query"></el-input>
        <span>部门：</span>
        <el-select v-model="queryDepartment" size="small" clearable @clear="query">
          <el-option v-for="(item, key) in departmentList" :key="key" :label="item.d_name" :value="item.d_id"></el-option>
        </el-select>
        <el-button size="small" @click="query">查询</el-button>
      </el-header>
      <el-container>
        <el-header height="45px" class="page-header">
          <el-button size="mini" @click="add">添加</el-button>
          <el-button size="mini" @click="update">修改</el-button>
          <el-button size="mini" @click="drop">删除</el-button>
          <el-button size="mini" @click="reset">重置密码</el-button>
          <el-button size="mini" @click="outTab">导出数据</el-button>
        </el-header>
        <el-main class="privilege-manage-main">
          <el-tabs v-model="activeTab" type="border-card" @tab-click="tabClick">
            <el-tab-pane v-for="(item, key) in leftRoleList" :key="key" :name="item.r_id" :label="item.r_name" class="main-tab-pane">
              <el-table
              id="out-table"
              :data="tableData"
              border
              highlight-current-row
              @row-click="rowClick">
                <el-table-column label="选择" width="50"><template slot-scope="scope" :align="center"><el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio></template></el-table-column>
                <el-table-column type="index" label="序号" :align="center" width="50"></el-table-column>
                <el-table-column prop="u_name" label="姓名" :align="center"></el-table-column>
                <el-table-column prop="u_username" label="用户名" :align="center"></el-table-column>
                <el-table-column prop="d_id" label="部门" :formatter="departmentFormat" :align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="u_education" label="学历" width="80" :align="center"></el-table-column>
                <el-table-column prop="u_sex" label="性别" width="50" :align="center"></el-table-column>
                <el-table-column prop="u_email" label="邮箱" show-overflow-tooltip :align="center"></el-table-column>
                <el-table-column prop="r_id" label="身份" :formatter="roleFormat" :align="center"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="addUserDlgVisible" :title="addUserDlgTitle" :close-on-click-modal="false" class="add-user-dialog" width="370px">
      <el-form :mdoel="addForm" ref="addForm" :rules="formRule">
        <el-form-item class="add-user-form-item" prop="u_name">
          <span class="add-user-form-span">姓名：</span><el-input v-model="addForm.u_name" class="add-user-form-input" :size="small"></el-input>
        </el-form-item>
        <el-form-item class="add-user-form-item" prop="u_username">
          <span class="add-user-form-span">用户名：</span><el-input v-model="addForm.u_username" :disabled="usernameDisable" class="add-user-form-input" :size="small"></el-input>
        </el-form-item>
        <el-form-item class="add-user-form-item" prop="u_education">
          <span class="add-user-form-span">学历：</span><el-input v-model="addForm.u_education" class="add-user-form-input" :size="small"></el-input>
        </el-form-item>
        <el-form-item class="add-user-form-item" prop="u_sex">
          <span class="add-user-form-span">性别：</span>
          <el-select v-model="addForm.u_sex" class="add-user-form-input" :size="small">
            <el-option v-for="(item, key) in sexList" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="add-user-form-item" prop="u_email">
          <span class="add-user-form-span">邮箱：</span><el-input v-model="addForm.u_email" class="add-user-form-input" :size="small"></el-input>
        </el-form-item>
        <el-form-item class="add-user-form-item" prop="d_id">
          <span class="add-user-form-span">部门：</span>
          <el-select v-model="addForm.d_id" class="add-user-form-input" :size="small">
            <el-option v-for="(item, key) in departmentList" :key="key" :value="item.d_id" :label="item.d_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="add-user-form-item" prop="r_id">
          <span class="add-user-form-span">身份：</span>
          <el-select v-model="addForm.r_id" multiple class="add-user-form-input" :size="small">
            <el-option v-for="(item, key) in roleList" :key="key" :value="item.r_id" :label="item.r_name" value-key="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addUserDlgVisible = false" :size="small">取消</el-button>
        <el-button @click="doAddUser" :size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data() {
    return {
      addUserDlgVisible: false,
      addUserDlgTitle: '添加用户',
      addForm: {
        u_name: '',
        u_username: '',
        r_id: [],
        u_education: '',
        u_sex: '',
        u_email: '',
        d_id: ''
      },
      roleList: [],
      tableData: [],
      activeTab: 'all',
      small: 'small',
      departmentList: [],
      sexList: [{
        value: '男'
      }, {
        value: '女'
      }],
      tableRadio: [],
      leftRoleList: [],
      formRule: {},
      usernameDisable: false,
      center: 'center',
      queryName: '',
      queryDepartment: ''
    }
  },
  mounted() {
    this.getTableData('all')
    this.getRole()
    this.getDepartment()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'getUserList', // 获取用户列表
      'getRoleList', // 获取角色列表
      'getDepartmentList', // 获取部门列表
      'addUser', // 添加用户
      'updateUser', // 修改用户信息
      'deleteUser', // 删除用户
      'resetPwd' // 重置密码
    ]),
    // 获取角色列表
    getRole: function() {
      this.getRoleList().then(res => {
        if (res.errno === 0) {
          this.roleList = res.data
          this.leftRoleList.push({
            r_name: '全部',
            r_id: 'all'
          })
          for(let i = 0; i < res.data.length; i++) {
            this.leftRoleList.push(res.data[i])
          }
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 获取部门列表
    getDepartment: function() {
      this.getDepartmentList().then(res => {
        if (res.errno === 0) {
          this.departmentList = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 打开添加用户对话框
    add: function() {
      this.addUserDlgVisible = true
      this.addUserDlgTitle = '添加用户'
      this.getDepartment()
      this.addForm = Object.assign({}, null)
      this.usernameDisable = false
    },
    // 添加
    doAddUser: function() {
      if (this.addUserDlgTitle === '添加用户') {
        let params = {
          u_name: this.addForm.u_name,
          u_username: this.addForm.u_username,
          u_education: this.addForm.u_education,
          u_sex: this.addForm.u_sex,
          u_email: this.addForm.u_email,
          d_id: this.addForm.d_id,
          r_id: JSON.stringify(this.addForm.r_id)
        }
        this.addUser(params).then(res => {
          if (res.errno === 0) {
            this.$message.success('添加成功')
            this.getTableData(this.activeTab)
            this.addUserDlgVisible = false
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      } else if (this.addUserDlgTitle === '修改用户信息') {
        let params = {
          u_id: this.tableRadio.u_id,
          u_name: this.addForm.u_name,
          u_education: this.addForm.u_education,
          u_sex: this.addForm.u_sex,
          u_email: this.addForm.u_email,
          d_id: this.addForm.d_id,
          r_id: JSON.stringify(this.addForm.r_id)
        }
        this.updateUser(params).then(res => {
          if (res.errno === 0) {
            this.$message.success('修改用户信息成功')
            this.addUserDlgVisible = false
            this.getTableData(this.activeTab)
          } else {
            this.$messages.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      }
      
    },
    // 根据身份获取表格数据
    tabClick: function(tab) {
      this.getTableData(tab.name)
    },
    // 获取表格数据
    getTableData: function(id) {
      this.getUserList({ r_id: id, name: this.queryName, department: this.queryDepartment }).then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 身份格式化显示
    roleFormat: function(row, column) {
      let r_id = JSON.parse(row.r_id)
      let data = []
      for (let i = 0; i< r_id.length; i++) {
        for (let j = 0; j < this.roleList.length; j++) {
          if (r_id[i] === this.roleList[j].r_id) {
            data.push(this.roleList[j].r_name)
          }
        }
      }
      let res = ''
      for (let i = 0; i < data.length; i++) {
        if(i === 0) {
          res = data[i]
        } else {
          res = res + ',' + data[i]
        }
      }
      return res
    },
    // 部门格式化显示
    departmentFormat: function(row, column) {
      for (let i = 0; i < this.departmentList.length; i++) {
        if (row.d_id === this.departmentList[i].d_id) {
          return this.departmentList[i].d_name
        }
      }
    },
    // 表格选中行
    rowClick: function(item) {
      this.tableRadio = item
    },
    // 导出表格数据
    outTab () {
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '用户表.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    // 打开修改对话框
    update: function() {
      const row = this.tableRadio
      if (row.length === 0) {
        this.$message.warning('请选择要修改的数据')
      } else {
        this.addUserDlgTitle = '修改用户信息'
        this.addUserDlgVisible = true
        this.addForm = Object.assign({}, row)
        this.addForm.r_id = JSON.parse(row.r_id)
        this.usernameDisable = true
      }
    },
    // 删除用户
    drop: function() {
      const row = this.tableRadio
      if (row.length === 0) {
        this.$message.warning('请选择要删除的数据')
      } else {
        this.$confirm('<div>此操作不可恢复!</div>确定要删除用户"' + row.u_name + '"吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.deleteUser({ u_id: row.u_id }).then(res => {
            if (res.errno === 0) {
              this.$message.success('成功删除用户"' + row.u_name + '"!')
              this.getTableData(this.activeTab)
            } else {
              this.$message.error(res.errmsg)
            }
          }).catch(error => { this.$message.error(error) })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    },
    // 重置密码
    reset: function() {
      const row = this.tableRadio
      if (row === null || row.length === 0) {
        this.$message.warning('请选择要重置密码的用户')
      } else {
        this.$confirm('此操作不可恢复，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.resetPwd({ u_id: row.u_id }).then(res => {
            if (res.errno === 0) {
              this.$message.success('重置密码成功, 初始密码为123456')
            } else {
              this.$message.error(res.errmsg)
            }
          }).catch(error => { this.$message.error(error) })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    },
    query: function() {
      this.getTableData(this.activeTab)
    }
  }
}
</script>

<style scoped>
.privilege-manage-container {
  height: calc(100vh - 46px);
}
.privilege-manage-header {
  line-height: 45px;
}
.privilege-manage-main {
  height: calc(100vh - 136px);
  padding: 10px;
  overflow: hidden;
}
.page-header {
  line-height: 45px;
  border-bottom: 1px solid rgb(232,240,255);
}
.add-user-form-item {
  margin-bottom: 7px;
}
.add-user-form-span {
  width: 85px;
  float: left;
}
.add-user-form-input {
  width: 200px;
}
.add-user-form-role-select {
  width: 200px;
  float: left;
}
.role-select-item {
  width: 90px;
  margin: 0px 5px 0px 0px;
}
.main-tab-pane {
  background-color: rgb(141, 165, 117);
}
.query-name {
  width: 200px;
}
</style>
<style>
.add-user-dialog .el-dialog__header {
  padding: 10px 25px 5px 25px;
}
.add-user-dialog .el-dialog__body {
  padding: 10px 25px;
}
.add-user-dialog .el-dialog__footer {
  padding-top: 0px;
}
.el-tabs--border-card>.el-tabs__content {
  padding: 10px;
  overflow: auto;
  height: calc(100vh - 217px);
}
</style>