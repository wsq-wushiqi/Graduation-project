<template>
  <div class="privilege-manage-container">
    <el-container>
      <el-header height="45px" class="privilege-manage-header">Header</el-header>
      <el-container>
        <el-header height="45px" class="page-header">
          <el-button size="mini" @click="addUser">添加</el-button>
        </el-header>
        <el-main class="privilege-manage-main">
          <el-tabs v-model="activeTab" tab-position="left" type="border-card" @tab-click="tabClick">
            <el-tab-pane name="all" label="全部"></el-tab-pane>
            <el-tab-pane v-for="(item, key) in roleList" :key="key" :name="item.value" :label="item.label" class="privilege-tab-pane">
              <el-table :data="tableData">
                <el-table-column prop="u_username" label="用户名"></el-table-column>
                <el-table-column v-if="item.value === '10'" prop="i_name" label="姓名"></el-table-column>
                <el-table-column v-if="item.value === '20'" prop="l_name" label="姓名"></el-table-column>
                <el-table-column prop="d_name" label="部门"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="addUserDlgVisible" :title="addUserDlgTitle" :close-on-click-modal="false" class="add-user-dialog" width="370px">
      <el-form :mdoel="addForm">
        <el-form-item class="add-user-form-item">
          <span class="add-user-form-span">姓名：</span><el-input v-model="addForm.name" class="add-user-form-input"></el-input>
        </el-form-item>
        <el-form-item class="add-user-form-item">
          <span class="add-user-form-span">用户名：</span><el-input v-model="addForm.username" class="add-user-form-input"></el-input>
        </el-form-item>
        <el-form-item class="add-user-form-item">
          <span class="add-user-form-span">身份：</span>
          <el-checkbox-group v-model="addForm.role" class="add-user-form-role-select" selection>
            <el-checkbox v-for="(item, key) in roleList" :key="key" :value="item.value" :label="item.label" value-key="item.value" class="role-select-item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addUserDlgVisible = false">取消</el-button>
        <el-button @click="doAddUser">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      addUserDlgVisible: false,
      addUserDlgTitle: '添加用户',
      addForm: {
        name: '',
        username: '',
        role: []
      },
      roleList: [{
        label: '普通员工',
        value: '10'
      }, {
        label: '讲师',
        value: '20'
      }, {
        label: '经理',
        value: '30'
      }, {
        label: '管理员',
        value: '50'
      }],
      tableData: [],
      activeTab: '10'
    }
  },
  mounted() {
    this.getStuList()
  },
  methods: {
    ...mapActions([
      'getStuInfoList',
      'getLecturerList',
      'getManageList'
    ]),
    addUser: function() {
      this.addUserDlgVisible = true
      this.addUserDlgTitle = '添加用户'
    },
    doAddUser: function() {
      console.log(this.addForm.role);
      
    },
    getStuList: function() {
      this.getStuInfoList().then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    getLectureList: function() {
      this.getLecturerList().then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.data)
        }
      }).catch(error => { this.$message.error(error) })
    },
    getManagerList: function() {
      this.getManageList().then(res => {
        console.log(res.data);
        if (res.errno === 0) {
          this.tableData = res.data
          console.log(res.data);
          
        } else {
          this.$messages.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    tabClick: function(tab) {
      console.log(tab.name);
      
      if (tab.name === '10') {
        this.getStuList()
      } else if (tab.name === '20') {
        this.getLectureList()
      } else if (tab.name === '30') {
        this.getManagerList()
      } else if (tab.name === '50') {
        this.$message.info('管理员')
      }
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
  margin-bottom: 10px;
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
.add-user-dialog .el-dialog__body {
  /* background-color: coral; */
  padding: 10px 25px;
}
.el-tabs--left .el-tabs__nav.is-left, .el-tabs--left .el-tabs__nav.is-right, .el-tabs--right .el-tabs__nav.is-left, .el-tabs--right .el-tabs__nav.is-right {
  /* height: 100%!important; */
  height: calc(100vh - 159px);
  overflow-y: auto;
}
</style>