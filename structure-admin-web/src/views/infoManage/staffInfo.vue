<template>
  <div class="personal-info-container">
    <el-container>
      <el-header class="query-header" height="50px">
        <span class="query-span">部门：</span><el-input v-model="queryDepartment" class="query-input" size="mini" clearable @clear="query"></el-input>
        <span class="query-span">姓名：</span><el-input v-model="queryName" class="query-input" size="mini" clearable @clear="query"></el-input>
        <el-button @click="query" size="mini">查询</el-button>
      </el-header>
      <el-main class="page-main">
        <el-container class="page-container">
          <el-header class="operation-header" height="45px">
            <el-button size="mini" @click="operateInfoDlg('add')">录入</el-button>
            <el-button size="mini" @click="doDelInfo">删除</el-button>
            <el-button size="mini" @click="operateInfoDlg('update')">修改</el-button>
            <el-button size="mini" @click="reset">重置密码</el-button>
            <el-button size="mini" @click="outTab">导出数据</el-button>
            <el-button size="mini" @click="addDepartmentVisible = true">添加部门</el-button>
          </el-header>
          <el-main class="table-main">
            <el-table
              id="out-table"
              :data="tableData"
              border
              height="100%"
              highlight-current-row
              @row-click="handleRowClick"
            >
              <el-table-column label="选择" width="50px" :align="tableAlign"><template slot-scope="scope"><el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio></template></el-table-column>
              <el-table-column prop="d_name" label="部门" :align="tableAlign"></el-table-column>
              <el-table-column prop="i_name" label="姓名" :align="tableAlign"></el-table-column>
              <el-table-column prop="i_sex" label="性别" :align="tableAlign"></el-table-column>
              <el-table-column prop="i_age" label="年龄" :align="tableAlign"></el-table-column>
              <el-table-column prop="i_email" label="邮箱" :align="tableAlign" show-overflow-tooltip></el-table-column>
              <el-table-column prop="u_username" label="用户名" :align="tableAlign"></el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="addInfoDlg" :title="dlgTitle" :close-on-click-modal="false" width="400px" class="add-info-dialog">
      <el-form ref="addInfoForm" :v-model="addInfoForm" :rules="formRule">
        <el-form-item>
          <span class="add-info-span">部门：</span>
          <!-- <el-input v-model="addInfoForm.d_name" class="add-info-item"></el-input> -->
          <el-select v-model="addInfoForm.d_name" class="add-info-item">
            <el-option v-for="(item, key) in departmentList" :key="key" :label="item.d_name" :value="item.d_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span class="add-info-span">{{ name }}：</span>
          <el-input v-model="addInfoForm.i_name" class="add-info-item"></el-input>
        </el-form-item>
        <el-form-item v-if="dlgTitle === '录入信息'">
          <span class="add-info-span">用户名：</span>
          <el-input v-model="addInfoForm.u_username" class="add-info-item"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-info-span">性别：</span>
          <el-input v-model="addInfoForm.i_sex" class="add-info-item"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-info-span">年龄：</span>
          <el-input v-model="addInfoForm.i_age" class="add-info-item"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-info-span">邮箱：</span>
          <el-input v-model="addInfoForm.i_email" class="add-info-item"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addInfoDlg = false">取消</el-button>
        <el-button @click="doAddInfo">确定</el-button>
      </div>
    </el-dialog>
    <!-- 添加部门对话框 -->
    <el-dialog :visible.sync="addDepartmentVisible" title="添加部门">
      <el-form :model="addDepartmentForm">
        <el-form-item>
          <span>名称</span><el-input v-model="addDepartmentForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <span>经理</span><el-input v-model="addDepartmentForm.manager"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDepartmentVisible = false">取消</el-button>
        <el-button @click="doAddDepartment">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data() {
    return {
      addInfoDlg: false,
      addInfoForm: {
        d_name: '',
        i_name: '',
        i_sex: '',
        i_age: '',
        i_email: '',
        u_username: ''
      },
      departmentList: [],
      formRule: {},
      tableData: [],
      tableRadio: [],
      dlgTitle: '录入信息',
      queryName: '',
      queryDepartment: '',
      name: '姓名',
      tableAlign: 'center',
      addDepartmentVisible: false,
      addDepartmentForm: {
        name: '',
        manager: ''
      }
      // updateInfoDlg: false
    }
  },
  mounted() {
    this.getTableData()
    // this.getDepartment()
  },
  methods: {
    ...mapActions([
      "addInfo",
      "infoList",
      "delInfo",
      "updateInfo",
      "queryInfo",
      "resetPwd",
      "addDepartment",
      "getDepartmentList"
    ]),
    // 获取表格数据
    getTableData: function() {
      this.infoList().then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        }
      })
    },
    outTab () {
      /* generate workbook object from table */
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
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
      this.getDepartment()
    },
    // 新增/修改功能
    doAddInfo: function() {
      if (this.dlgTitle === '录入信息') {
        let params = {
          params: {
            department: this.addInfoForm.d_name,
            name: this.addInfoForm.i_name,
            sex: this.addInfoForm.i_sex,
            age: this.addInfoForm.i_age,
            email: this.addInfoForm.i_email,
            username: this.addInfoForm.u_username
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
          id: this.tableRadio.i_id,
          department: this.addInfoForm.d_name,
          name: this.addInfoForm.i_name,
          sex: this.addInfoForm.i_sex,
          age: this.addInfoForm.i_age,
          email: this.addInfoForm.i_email
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
            id: row.i_id
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
    // 重置密码
    reset:function() {
      const row = this.tableRadio
      if (row === null || row.length === 0) {
        this.$message.warning('请选择要重置密码的用户')
      } else {
        this.$confirm('次操作不可恢复，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.resetPwd({
            id: row.i_id
          }).then(res => {
            if (res.errno === 0) {
              this.$message.success('重置成功')
            } else {
              this.$message.error(res.errmsg)
            }
          }).catch(error => { this.$message.error(error) })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
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
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 添加部门
    doAddDepartment: function() {
      let params = {
        name: this.addDepartmentForm.name,
        manager: this.addDepartmentForm.manager
      }
      this.addDepartment(params).then(res => {
        if (res.errno === 0) {
          this.$message.success('添加成功')
        }
      })
    },
    // 获取部门列表
    getDepartment: function() {
      this.getDepartmentList().then(res => {
        if (res.errno === 0) {
          this.departmentList = res.data
        } else {
          this.$message.error('获取部门列表失败')
        }
      }).catch(error => { this.$message.error(error) })
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
  /* background-color: coral; */
  padding: 12px 0px 5px 10px;
}
.add-info-dialog .el-dialog__body {
  /* background-color: rgb(212, 160, 141); */
  padding-top: 10px;
  padding-bottom: 3px;
}
.add-info-dialog .el-dialog__footer {
  /* background-color: rgb(126, 117, 114); */
  padding-bottom: 15px;
  padding-top: 0px;
}
</style>