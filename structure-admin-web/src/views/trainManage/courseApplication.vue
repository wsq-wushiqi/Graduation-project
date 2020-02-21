<template>
  <div>
    <el-container>
      <el-header class="query-header" height="45px">
        <span>审核状态：</span>
        <el-select v-model="auditStatus" clearable size="small" class="query-select" @clear="query">
          <el-option v-for="(item, key) in auditStatusList" :key="key" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" plain size="small" icon="el-icon-search" @click="query">查询</el-button>
      </el-header>
      <el-container>
        <el-header class="operation-header" height="45px">
          <el-button size="mini" icon="el-icon-position" @click="apply">申请</el-button>
          <el-button size="mini" icon="el-icon-set-up" @click="update">修改</el-button>
          <el-button size="mini" icon="el-icon-remove-outline" @click="cancel">撤销</el-button>
          <!-- <el-button size="mini" @click="examineDlg">审核</el-button> -->
        </el-header>
        <el-main class="page-main">
          <el-table
          :data="tableData.slice((currentPage - 1)*pageSize, currentPage*pageSize)"
          height="calc(100vh - 183px)"
          border
          highlight-current-row
          @row-click="rowClick">
            <el-table-column label="选择" width="50" :align="center"><template slot-scope="scope"><el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio></template></el-table-column>
            <el-table-column prop="c_name" label="课程名称" :align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="c_category" label="类别" :align="center"></el-table-column>
            <el-table-column prop="d_name" label="开课部门" :align="center"></el-table-column>
            <el-table-column prop="c_hour" label="课时" width="50" :align="center"></el-table-column>
            <el-table-column prop="u_name" label="申请人" :align="center"></el-table-column>
            <el-table-column prop="c_status" label="审核状态" :formatter="statusFormatter" :align="center"></el-table-column>
            <el-table-column prop="c_opinion" label="审核意见" :align="center" show-overflow-tooltip></el-table-column>
          </el-table>
          <el-pagination
          class="pagination-class"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20,30,40,50]"
          :page-size="pageSize"
          :total="tableData.length"
          layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="applyDlgVisible" :title="applyDlgTitle" :close-on-click-modal="false" width="400px">
      <el-form :model="applyForm" ref="applyForm" :rules="formRule">
        <el-form-item prop="name">
          <span class="apply-form-span">名称：</span><el-input v-model="applyForm.c_name" class="apply-form-input"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <span class="apply-form-span">类别：</span><el-input v-model="applyForm.c_category" class="apply-form-input"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <span class="apply-form-span">学时：</span><el-input v-model="applyForm.c_hour" class="apply-form-input"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <span class="apply-form-span">开课部门：</span>
          <el-select v-model="applyForm.d_name" class="apply-form-input">
            <el-option v-for="(item, key) in departmentList" :key="key" :value="item.d_id" :label="item.d_name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="applyDlgVisible = false">取消</el-button>
        <el-button @click="doApply">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="examineVisible" title="课程审核" class="examine-dialog" width="400px">
      <span class="examine-name">{{ courseName }}</span>
      <el-form :model="examineForm">
        <el-form-item class="examine-form-item">
          <span class="examine-span">开课部门：</span><span>{{ examineForm.d_name}}</span>
        </el-form-item>
        <el-form-item class="examine-form-item">
          <span class="examine-span">课程类别：</span><span>{{ examineForm.c_category}}</span>
        </el-form-item>
        <el-form-item class="examine-form-item">
          <span class="examine-span">课时：</span><span>{{ examineForm.c_hour}}</span>
        </el-form-item>
        <el-form-item class="examine-form-item">
          <span class="examine-span">申请人：</span><span>{{ examineForm.u_name}}</span>
        </el-form-item>
        <el-form-item class="examine-form-item">
          <span class="examine-span">审核：</span>
          <el-select v-model="examineForm.auditStatus">
            <el-option v-for="(item, key) in auditStatusList" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="examine-form-item">
          <span class="examine-span">审核意见：</span>
          <textarea v-model="examineForm.opinion" rows="5" class="examine-textarea"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="examineVisible = false">取消</el-button>
        <el-button @click="doExamine">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      auditStatus: '',
      auditStatusList: [{
        label: '待审核',
        value: '1'
      }, {
        label: '审核通过',
        value: '2'
      }, {
        label: '不通过',
        value: '3'
      }],
      applyDlgVisible: false,
      applyDlgTitle: '课程申请',
      applyForm: {
        c_name: '',
        c_category: '',
        c_hour: 0.00,
        d_name: '',
      },
      formRule: {
        
      },
      tableData: [],
      tableRadio: [],
      examineVisible: false,
      courseName: '',
      examineForm: {
        c_category: '',
        c_hour: 0.00,
        d_name: '',
        u_name: '',
        auditStatus: '',
        opinion: ''
      },
      departmentList: [],
      center: 'center',
      currentPage: 1,
      pageSize: 10
    }
  },
  mounted() {
    this.getTableData()
    this.getDepartment()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'applyCourse',
      'getCourseList',
      'updateCourse',
      'cancelApply',
      'examine',
      'getDepartmentList'
    ]),
    handleSizeChange: function(val) {
      this.pageSize = val
      return this.pageSize
    },
    handleCurrentChange: function(val) {
      this.currentPage = val
      return this.currentPage
    },
    apply: function() {
      this.applyDlgVisible = true
      this.applyDlgTitle = '课程申请'
      this.applyForm = Object.assign({}, null)
    },
    doApply: function() {
      if (this.applyDlgTitle === '课程申请') {
        let params = {
          c_name: this.applyForm.c_name,
          c_category: this.applyForm.c_category,
          c_hour: this.applyForm.c_hour,
          d_id: this.applyForm.d_name
        }
        this.applyCourse(params).then(res => {
          if (res.errno === 0) {
            this.$message.success('添加课程申请成功')
            this.getTableData()
            this.applyDlgVisible = false          
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      } else {
        const row = this.tableRadio
        let d_id = ''
        for (let i=0; i<this.departmentList.length; i++) {
          if (this.applyForm.d_name === this.departmentList[i].d_name || this.applyForm.d_name === this.departmentList[i].d_id) {
            d_id = this.departmentList[i].d_id
          }
        }
        let params = {
          c_id: row.c_id,
          c_name: this.applyForm.c_name,
          d_id: d_id,
          c_category: this.applyForm.c_category,
          c_hour: this.applyForm.c_hour
        }
        this.updateCourse(params).then(res => {
          if (res.errno === 0) {
            this.$message.success('修改申请成功')
            this.applyDlgVisible = false
            this.getTableData()
          } else {
            this.$messages.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      }
    },
    getTableData: function() {
      this.getCourseList({ c_status: this.auditStatus }).then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    rowClick: function(item) {
      this.tableRadio = item
    },
    update: function() {
      const row = this.tableRadio
      if (row === null || row.length === 0) {
        this.$message.warning('请选择要修改的数据')
      } else {
        if (row.u_id!== this.userInfo.u_id) {
          this.$message.error('非此课程的申请人，不可修改！')
        } else {
          this.applyDlgVisible = true
          this.applyDlgTitle = '修改申请'
          this.applyForm = Object.assign({}, row)
        }
      }
    },
    statusFormatter: function(row, column) {
      let data = row[column.property]
      if (data === undefined) {
        return ''
      } else {
        if (data === '1') {
          return '待审核'
        } else if (data === '2') {
          return '审核通过'
        } else if (data === '3') {
          return '不通过'
        }
      }
    },
    cancel: function() {
      const row = this.tableRadio
      if (row === null || row.length === 0) {
        this.$message.warning('请选择要撤销申请的课程')
      } else {
        if (row.u_id !== this.userInfo.u_id) {
          this.$message.error('非此课程的申请人，不可撤销！')
        } else if (row.c_status === '2') {
          this.$message.error('审核通过的课程不可撤销')
        } else {
          this.$confirm('此操作不可恢复，是否确定撤销课程"'+ row.c_name +'"申请？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.cancelApply({id: row.c_id}).then(res => {
              if (res.errno === 0) {
                this.$message.success('课程"' + row.c_name + '"已成功撤销申请')
                this.getTableData()
              }
            })
          }).catch(() => {
            this.$message.info('已取消')
          })
        }
      }
    },
    query: function() {
      this.currentPage = 1
      this.getTableData()
    },
    examineDlg: function() {
      const row = this.tableRadio
      if (row === null || row.length === 0) {
        this.$message.warning('请选择要审核和课程')
      } else {
        this.examineVisible = true
        this.courseName = row.c_name
        this.examineForm = Object.assign({}, row)
      }
    },
    doExamine: function() {
      const row = this.tableRadio
      if (this.examineForm.auditStatus === undefined || this.examineForm.auditStatus === '' || this.examineForm.auditStatus === '1') {
        this.$message.error('审核状态不正确')
      } else if (this.examineForm.auditStatus === '3' && (this.examineForm.opinion === '' || this.examineForm.opinion === undefined)) {
        this.$message.error('请输入不通过的审核意见')
      } else {
        let params = {
          id: row.c_id,
          status: this.examineForm.auditStatus,
          opinion: this.examineForm.opinion
        }
        this.examine(params).then(res => {
          if (res.errno === 0) {
            this.$message.success('审核成功')
            this.examineVisible = false
            this.getTableData()
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      }
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
.query-header {
  line-height: 45px;
}
.operation-header {
  line-height: 45px;
  border-bottom: 1px solid rgb(210,226,255);
}
.apply-form-span {
  display: inline-block;
  width: 20%;
  text-align: right;
}
.apply-form-input {
  width: 60%;
  margin-left: 5px;
}
.examine-name {
  margin-right: 50px;
  display: inline-block;
  width: 300px;
  font-size: 25px;
  text-align: center;
}
.examine-span {
  display: inline-block;
  width: 100px;
}
.examine-textarea {
  vertical-align: top;
  border: 1px solid rgb(220,223,230);
  border-radius: 4px;
  width: 210px;
  color: rgb(107, 109, 110);
  font-family: Georgia, 'Times New Roman', Times, serif;
  padding: 3px;
}
.examine-form-item {
  margin-bottom: 5px;
}
.page-main {
  /* background-color: chocolate; */
  height: calc(100vh - 136px);
  padding: 10px 10px 0px 10px;
}
</style>
<style>
.examine-dialog .el-dialog__header {
  padding-bottom: 2px;
}
.examine-dialog .el-dialog__body {
  padding: 0px 0px 0px 50px;
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
</style>