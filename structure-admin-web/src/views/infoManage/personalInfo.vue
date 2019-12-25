<template>
  <div class="personal-info-container">
    <el-container>
      <el-header class="query-header" height="50px">
        <span class="query-span">部门：</span><el-input v-model="queryDepartment" class="query-input" size="mini"></el-input>
        <span class="query-span">姓名：</span><el-input v-model="queryName" class="query-input" size="mini"></el-input>
        <el-button @click="query" size="mini">查询</el-button>
      </el-header>
      <el-main class="page-main">
        <el-container class="page-container">
          <el-header class="operation-header" height="45px">
            <el-button size="mini" @click="operateInfoDlg('add')">录入</el-button>
            <el-button size="mini" @click="doDelInfo">删除</el-button>
            <el-button size="mini" @click="operateInfoDlg('update')">修改</el-button>
          </el-header>
          <el-main class="table-main">
            <el-table
             :data="tableData"
             border
             height="100%"
             highlight-current-row
             @row-click="handleRowClick"
            >
              <el-table-column label="选择" width="50px"><template slot-scope="scope"><el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio></template></el-table-column>
              <el-table-column prop="department" label="部门"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="sex" label="性别"></el-table-column>
              <el-table-column prop="age" label="年龄"></el-table-column>
              <el-table-column prop="email" label="邮箱"></el-table-column>
              <el-table-column prop="username" label="用户名"></el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="addInfoDlg" :title="dlgTitle" :close-on-click-modal="false" width="400px" class="add-info-dialog">
      <el-form ref="addInfoForm" :v-model="addInfoForm" :rules="formRule">
        <el-form-item>
          <span class="add-info-span">部门：</span>
          <el-input v-model="addInfoForm.department" class="add-info-item"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-info-span">{{ name }}：</span>
          <el-input v-model="addInfoForm.name" class="add-info-item"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-info-span">用户名：</span>
          <el-input v-model="addInfoForm.username" class="add-info-item"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-info-span">性别：</span>
          <el-input v-model="addInfoForm.sex" class="add-info-item"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-info-span">年龄：</span>
          <el-input v-model="addInfoForm.age" class="add-info-item"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-info-span">邮箱：</span>
          <el-input v-model="addInfoForm.email" class="add-info-item"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addInfoDlg = false">取消</el-button>
        <el-button @click="doAddInfo">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      addInfoDlg: false,
      addInfoForm: {
        department: '',
        name: '',
        sex: '',
        age: '',
        email: '',
        username: ''
      },
      formRule: {},
      tableData: [],
      tableRadio: [],
      dlgTitle: '录入信息',
      queryName: '',
      queryDepartment: '',
      name: '姓名'
      // updateInfoDlg: false
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    ...mapActions([
      "addInfo",
      "infoList",
      "delInfo",
      "updateInfo",
      "queryInfo"
    ]),
    // 获取表格数据
    getTableData: function() {
      this.infoList().then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        }
      })
    },
    // 打开新增/修改表格
    operateInfoDlg: function(text) {
      if (text === 'add') {
        this.dlgTitle = '录入信息'
        this.addInfoDlg = true
      } else if (text === 'update') {
        const row = this.tableRadio
        if (row.length === 0) {
          this.$message.warning('请选择要修改的信息')
        } else {
          this.dlgTitle = '修改信息'
          this.addInfoDlg = true
          this.addInfoForm = Object.assign({}, row)
        }
      }
    },
    // 新增/修改功能
    doAddInfo: function() {
      if (this.dlgTitle === '录入信息') {
        let params = {
          params: {
            department: this.addInfoForm.department,
            name: this.addInfoForm.name,
            sex: this.addInfoForm.sex,
            age: this.addInfoForm.age,
            email: this.addInfoForm.email,
            username: this.addInfoForm.username
          }
        }
        this.addInfo(params).then(res => {
          if (res.errno === 0) {
            this.addInfoDlg = false
            this.$message.success('添加信息成功')
            this.tableData = res.data
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      } else if (this.dlgTitle === '修改信息') {
        let params = {
          id: this.tableRadio.id,
          department: this.addInfoForm.department,
          name: this.addInfoForm.name,
          sex: this.addInfoForm.sex,
          age: this.addInfoForm.age,
          email: this.addInfoForm.email
        }
        this.updateInfo(params).then(res => {
          if (res.errno === 0) {
            this.addInfoDlg = false
            this.$message.success('修改成功')
            this.tableData = res.data
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      }
    },
    // 删除信息
    doDelInfo: function() {
      const row = this.tableRadio
      if (row.length === 0) {
        this.$message.warning('请选择要删除的数据')
      } else {
        this.$confirm('此操作将永久删除该数据，是否继续？','提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id
          }
          this.delInfo(params).then(res => {
            if (res.errno === 0) {
              this.tableData = res.data
              this.$message.success('删除成功')
            } else {
              this.$message.error('删除失败')
            }
          })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    },
    // 点击表格数据
    handleRowClick: function(row) {
      this.tableRadio = row
    },
    // 查询
    query: function() {
      let name = this.queryName
      let department = this.queryDepartment
      let params = {
        name: name,
        department:department
      }
      this.queryInfo(params).then(res => {
        console.log(res);
        
      })
    }
  }
}
</script>

<style scoped>
.personal-info-container {
  height: calc(100vh - 46px);
}
.query-header {
  /* background-color: cadetblue; */
  line-height: 50px;
}
.page-main {
  /* background-color: thistle; */
  height: calc(100vh - 96px);
  padding: 0px;
}
.operation-header {
  /* background-color: tan; */
  line-height: 45px;
}
.table-main {
  /* background-color: coral; */
  /* height: 100%; */
  height: calc(100vh - 141px);
  border-top: 1px solid rgb(210,226,255);
  padding: 5px;
}
.add-info-item {
  width: 60%;
}
.query-span {
  /* background-color: coral; */
  display: inline-block;
  width: 65px;
  line-height: 30px;
}
.query-input {
  width: 150px;
  margin-right: 20px;
}
.add-info-span {
  /* background-color: cornflowerblue; */
  display: inline-block;
  width: 25%;
  text-align: right;
}
</style>
<style>
/* 固定表头高度 */
.el-table__header tr,
.el-table__header th {
  padding: 0px;
  height: 40px;
}
.el-table__body tr.current-row>td {
  background-color: rgb(210,226,255);
}
.el-table tbody tr:hover>td {
  background-color: rgb(232,240,255)!important;
  /* color: aliceblue; */
}
.add-info-dialog .el-dialog__header {
  background-color: coral;
  padding: 12px 0px 5px 10px;
}
.add-info-dialog .el-dialog__body {
  background-color: rgb(212, 160, 141);
  padding-top: 10px;
  padding-bottom: 7px;
}
.add-info-dialog .el-dialog__footer {
  background-color: rgb(126, 117, 114);
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>