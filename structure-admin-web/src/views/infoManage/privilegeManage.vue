<template>
  <div class="privilege-manage-container">
    <el-container>
      <el-header height="45px" class="privilege-manage-header">Header</el-header>
      <el-container>
        <el-header height="45px" class="page-header">
          <el-button size="mini" @click="add">添加</el-button>
        </el-header>
        <el-main class="privilege-manage-main">
          <el-tabs v-model="activeTab" tab-position="left" type="border-card" @tab-click="tabClick">
            <el-tab-pane name="all" label="全部">
              <el-table :data="tableData">
                <el-table-column prop="u_name" label="姓名"></el-table-column>
                <el-table-column prop="u_username" label="用户名"></el-table-column>
                <el-table-column prop="u_education" label="学历"></el-table-column>
                <el-table-column prop="u_sex" label="性别"></el-table-column>
                <el-table-column prop="u_email" label="邮箱"></el-table-column>
                <el-table-column prop="r_id" label="身份" :formatter="roleFormat"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane v-for="(item, key) in roleList" :key="key" :name="item.value" :label="item.label" class="privilege-tab-pane">
              <el-table :data="tableData">
                <el-table-column prop="u_name" label="姓名"></el-table-column>
                <el-table-column prop="u_username" label="用户名"></el-table-column>
                <el-table-column prop="u_education" label="学历"></el-table-column>
                <el-table-column prop="u_sex" label="性别"></el-table-column>
                <el-table-column prop="u_email" label="邮箱"></el-table-column>
                <el-table-column prop="u_phone" label="电话"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="addUserDlgVisible" :title="addUserDlgTitle" :close-on-click-modal="false" class="add-user-dialog" width="370px">
      <el-form :mdoel="addForm">
        <el-form-item class="add-user-form-item">
          <span class="add-user-form-span">姓名：</span><el-input v-model="addForm.u_name" class="add-user-form-input" :size="small"></el-input>
        </el-form-item>
        <el-form-item class="add-user-form-item">
          <span class="add-user-form-span">用户名：</span><el-input v-model="addForm.u_username" class="add-user-form-input" :size="small"></el-input>
        </el-form-item>
        <el-form-item class="add-user-form-item">
          <span class="add-user-form-span">学历：</span><el-input v-model="addForm.u_education" class="add-user-form-input" :size="small"></el-input>
        </el-form-item>
        <el-form-item class="add-user-form-item">
          <span class="add-user-form-span">性别：</span>
          <el-select v-model="addForm.u_sex" class="add-user-form-input" :size="small">
            <el-option v-for="(item, key) in sexList" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <!-- <el-input v-model="addForm.u_sex" class="add-user-form-input" :size="small"></el-input> -->
        </el-form-item>
        <el-form-item class="add-user-form-item">
          <span class="add-user-form-span">邮箱：</span><el-input v-model="addForm.u_email" class="add-user-form-input" :size="small"></el-input>
        </el-form-item>
        <el-form-item class="add-user-form-item">
          <span class="add-user-form-span">部门：</span>
          <el-select v-model="addForm.d_id" class="add-user-form-input" :size="small">
            <el-option v-for="(item, key) in departmentList" :key="key" :value="item.d_id" :label="item.d_name"></el-option>
          </el-select>
          <!-- <el-input v-model="addForm.d_id" class="add-user-form-input" :size="small"></el-input> -->
        </el-form-item>
        <el-form-item class="add-user-form-item">
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
      }]
    }
  },
  mounted() {
    // this.getStuList()
    this.getTableData()
    this.getRole()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      // 'getStuInfoList',
      // 'getLecturerList',
      // 'getManageList',
      'getUserList', // 获取用户列表
      'getRoleList', // 获取角色列表
      'getDepartmentList', // 获取部门列表
      'addUser' // 添加用户
    ]),
    getRole: function() {
      this.getRoleList().then(res => {
        if (res.errno === 0) {
          this.roleList = res.data
          console.log(this.roleList);
          console.log(this.userInfo);
          
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    getDepartment: function() {
      this.getDepartmentList().then(res => {
        if (res.errno === 0) {
          this.departmentList = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    add: function() {
      this.addUserDlgVisible = true
      this.addUserDlgTitle = '添加用户'
      
      this.getDepartment()
    },
    doAddUser: function() {
      console.log(this.addForm.role);
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
          this.getTableData()
          this.addUserDlgVisible = false
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
      console.log(params);
      
    },
    // getStuList: function() {
    //   this.getStuInfoList().then(res => {
    //     if (res.errno === 0) {
    //       this.tableData = res.data
    //     } else {
    //       this.$message.error(res.errmsg)
    //     }
    //   }).catch(error => { this.$message.error(error) })
    // },
    // getLectureList: function() {
    //   this.getLecturerList().then(res => {
    //     if (res.errno === 0) {
    //       this.tableData = res.data
    //     } else {
    //       this.$message.error(res.data)
    //     }
    //   }).catch(error => { this.$message.error(error) })
    // },
    // getManagerList: function() {
    //   this.getManageList().then(res => {
    //     console.log(res.data);
    //     if (res.errno === 0) {
    //       this.tableData = res.data
    //       console.log(res.data);
          
    //     } else {
    //       this.$messages.error(res.errmsg)
    //     }
    //   }).catch(error => { this.$message.error(error) })
    // },
    tabClick: function(tab) {
      console.log(tab.name);
      
      // if (tab.name === '10') {
      //   this.getStuList()
      // } else if (tab.name === '20') {
      //   this.getLectureList()
      // } else if (tab.name === '30') {
      //   this.getManagerList()
      // } else if (tab.name === '50') {
      //   this.$message.info('管理员')
      // }
    },
    getTableData: function() {
      this.getUserList().then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
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
    }
  }
}
</script>

<style scoped>
.privilege-manage-container {
  /* background-color: rgb(55, 93, 126); */
  height: calc(100vh - 46px);
}
.privilege-manage-header {
  line-height: 45px;
  /* border-bottom: 1px solid rgb(232,240,255); */
}
.privilege-manage-main {
  /* background-color: thistle; */
  height: calc(100vh - 136px);
  padding: 10px;
}
.page-header {
  line-height: 45px;
  border-bottom: 1px solid rgb(232,240,255);
}
.add-user-form-item {
  margin-bottom: 7px;
}
.add-user-form-span {
  /* background-color: cadetblue; */
  /* display: inline-block; */
  width: 85px;
  float: left;
}
.add-user-form-input {
  width: 200px;
}
.add-user-form-role-select {
  /* background-color: yellowgreen; */
  width: 200px;
  float: left;
  /* margin: 0px; */
  /* position: relative; */
  /* position: absolute; */
}
.role-select-item {
  /* background-color: cadetblue; */
  width: 90px;
  margin: 0px 5px 0px 0px;
  /* position: absolute; */

}
.privilege-tab-pane {
  /* background-color: thistle; */
  /* height: 100%; */
  height: calc(100vh - 189px);
}
</style>
<style>
.add-user-dialog .el-dialog__header {
  /* background-color: coral; */
  padding: 10px 25px 5px 25px;
}
.add-user-dialog .el-dialog__body {
  /* background-color: coral; */
  padding: 10px 25px;
}
.add-user-dialog .el-dialog__footer {
  /* background-color: coral; */
  /* padding: 10px 25px; */
  padding-top: 0px;
}
.el-tabs--left .el-tabs__nav.is-left, .el-tabs--left .el-tabs__nav.is-right, .el-tabs--right .el-tabs__nav.is-left, .el-tabs--right .el-tabs__nav.is-right {
  /* height: 100%!important; */
  height: calc(100vh - 159px);
  overflow-y: auto;
}
</style>