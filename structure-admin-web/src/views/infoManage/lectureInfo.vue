<template>
  <div class="lecture-info-container">
    <el-container>
      <el-header class="query-header" height="50px">
        <span class="query-span">部门：</span><el-input v-model="queryDepartment" class="query-input" size="mini" clearable @clear="query"></el-input>
        <span class="query-span">姓名：</span><el-input v-model="queryName" class="query-input" size="mini" clearable @clear="query"></el-input>
        <el-button @click="query" size="mini">查询</el-button>
      </el-header>
      <el-container>
        <el-header class="operation-header" height="45px">
          <el-button size="mini" @click="add">录入</el-button>
          <el-button size="mini" @click="update">修改</el-button>
          <el-button size="mini" @click="dele">删除</el-button>
        </el-header>
        <el-main>
          <el-table
          :data="tableData"
          border
          highlight-current-row
          @row-click="rowClick">
            <el-table-column label="选择" width="50px"><template slot-scope="scope"><el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio></template></el-table-column>
            <el-table-column prop="d_name" label="部门"></el-table-column>
            <el-table-column prop="l_name" label="姓名"></el-table-column>
            <el-table-column prop="l_sex" label="性别"></el-table-column>
            <el-table-column prop="u_username" label="用户名"></el-table-column>
            <el-table-column prop="l_education" label="学历"></el-table-column>
            <el-table-column prop="l_grade" label="评分"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="addDlgVisible" :title="addDlgTitle" width="400px" :close-on-click-modal="false">
      <el-form :model="addForm">
        <el-form-item>
          <span class="add-form-sapn">姓名：</span>
          <el-input v-model="addForm.l_name" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-sapn">用户名：</span>
          <el-input v-model="addForm.u_username" :disabled="addDlgTitle === '修改信息'" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-sapn">性别：</span>
          <el-input v-model="addForm.l_sex" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-sapn">部门：</span>
          <!-- <el-input v-model="addForm.d_name" class="add-form-input"></el-input> -->
          <el-select v-model="addForm.d_name" class="add-form-input">
            <el-option v-for="(item, key) in departmentList" :key="key" :value="item.d_id" :label="item.d_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span class="add-form-sapn">学历：</span>
          <el-input v-model="addForm.l_education" class="add-form-input"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <span class="add-form-sapn">评分：</span>
          <el-input v-model="addForm.l_grade"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer">
        <el-button @click="addDlgVisible = false">取消</el-button>
        <el-button @click="doAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      queryDepartment: '',
      queryName: '',
      addDlgVisible: false,
      addForm: {
        l_name: '',
        l_sex: '',
        d_name: '',
        l_education: '',
        l_grade: '',
        u_username: ''
      },
      tableData: [],
      tableRadio: [],
      addDlgTitle: '录入信息',
      departmentList: []
    }
  },
  mounted() {
    this.getTableData()
    this.getDepartment()
  },
  methods: {
    ...mapActions([
      'addLectureInfo',
      'getLectureList',
      'updateLectureInfo',
      'deleteInfo',
      'queryLectureInfo',
      'getDepartmentList'
    ]),
    // 查询
    query: function() {
      // this.$message.success('查询')
      let params = {
        name: this.queryName,
        department: this.queryDepartment
      }
      this.queryLectureInfo(params).then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.errmsg
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 打开录入信息对话框
    add: function() {
      this.addDlgVisible = true
      this.addDlgTitle = '录入信息'
      this.addForm = Object.assign({}, null)
      // this.getDepartment()
    },
    // 录入、修改对话框确定按钮
    doAdd: function() {
      if (this.addDlgTitle === '录入信息') {
        let params = {
          name: this.addForm.l_name,
          department: this.addForm.d_name,
          sex: this.addForm.l_sex,
          username: this.addForm.u_username,
          education: this.addForm.l_education
        }
        this.addLectureInfo(params).then(res => {
          if (res.errno === 0) {
            this.$message.success('添加成功')
            this.getTableData()
            this.addDlgVisible = false
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      } else {
        const row = this.tableRadio
        let params = {
          l_id: row.l_id,
          l_name: this.addForm.l_name,
          d_name: this.addForm.d_name,
          l_sex: this.addForm.l_sex,
          l_education: this.addForm.l_education
        }
        this.updateLectureInfo(params).then(res => {
          if (res.errno === 0) {
            this.$message.success('修改成功')
            this.addDlgVisible = false
            this.getTableData()
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      }
    },
    // 获取表格数据
    getTableData: function() {
      this.getLectureList().then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 选中表格数据
    rowClick: function(item) {
      this.tableRadio = item
    },
    // 打开修改信息对话框
    update: function() {
      const row = this.tableRadio
      if (row === null || row.length === 0) {
        this.$message.warning('请选择要修改的信息')
      } else {
        this.addDlgVisible = true
        this.addDlgTitle = '修改信息'
        this.addForm = Object.assign({}, row)
        // this.getDepartment()
      }
    },
    // 删除数据
    dele: function() {
      const row = this.tableRadio
      if (row === null || row.length === 0) {
        this.$message.warning('请选择要删除的数据')
      } else {
        this.$confirm('从操作不可恢复，确定要删除用户'+row.l_name+'吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message.success('删除')
          this.deleteInfo({ id: row.l_id }).then(res => {
            if (res.errno === 0) {
              this.$message.success(res.data)
              this.getTableData()
            } else {
              this.$message.error(res.errmsg)
            }
          }).catch(error => { this.$message.error(error) })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    },
    // 获取部门列表
    getDepartment: function() {
      console.log('11111111111111');
      this.getDepartmentList().then(res => {
        if (res.errno === 0) {
          this.departmentList = res.data
        } else {
          this.$message.error('获取部门列表失败')
        }
        console.log(res);
        
      }).catch(error => { this.$message.error(error) })
    }
  }
}
</script>

<style scoped>
.lecture-info-container {
  height: calc(100vh - 46px);
}
.query-header {
  /* background-color: cadetblue; */
  line-height: 50px;
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
.operation-header {
  /* background-color: burlywood; */
  line-height: 45px;
  border-bottom: 1px solid rgb(210,226,255);
}
.add-form-sapn {
  /* background-color: rgb(180, 141, 206); */
  display: inline-block;
  width: 18%;
  text-align: right;
}
.add-form-input {
  width: 60%;
  margin-left: 5px;
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
</style>