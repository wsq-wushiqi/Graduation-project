<template>
  <div>
    <el-container>
      <el-header class="query-header" height="45px">
        <span>课程名称：</span>
        <el-select v-model="queryCourseName" size="small" clearable @clear="query">
          <el-option v-for="(item, key) in courseList" :key="key" :label="item.c_name" :value="item.c_name"></el-option>
        </el-select>
        <el-button type="primary" plain size="small" icon="el-icon-search" @click="query">查询</el-button>
      </el-header>
      <el-container>
        <el-header class="operation-header" height="45px">
          <el-button v-if="btnShow" size="mini" icon="bs-bianji_huaban" @click="detailDlg">编辑详情</el-button>
          <el-button v-if="btnShow" size="mini" icon="bs-yonghuguanli" @click="addStuDlg">添加人员</el-button>
          <el-button size="mini" icon="el-icon-shopping-cart-full" @click="apply">加入课程</el-button>
          <el-button size="mini" icon="bs-daochu" @click="outTab">导出数据</el-button>
        </el-header>
        <el-main class="table-main">
          <el-table
          :data="tableData.slice((currentPage - 1)*pageSize, currentPage*pageSize)"
          id="out-table"
          border
          highlight-current-row
          height="calc(100vh - 178px)"
          @row-click="rowClick">
            <el-table-column label="选择" width="50px" :align="center"><template slot-scope="scope"><el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio></template></el-table-column>
            <el-table-column prop='c_name' label="课程名称" width="100px" :align="center"></el-table-column>
            <el-table-column prop='u_name' label="申请人" width="90px" sortable :align="center"></el-table-column>
            <el-table-column prop='c_date' label="上课时间" width="200px" show-overflow-tooltip :align="center"></el-table-column>
            <el-table-column prop='c_place' label="上课地点" :align="center"></el-table-column>
            <el-table-column prop='c_number' label="已选人数" :align="center">
              <template slot-scope="scope">
                <span class="table-text-button" title="点击查看人员详情" @click="checkStu(scope.row)">{{scope.row.c_number}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="c_max_number" label="限制人数" :align="center"></el-table-column>
            <el-table-column prop='c_lecturer' label="主讲人" :formatter="lecturerFormat" :align="center"></el-table-column>
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
    <!-- 添加/修改课程详情 -->
    <el-dialog :visible.sync="detailDlgVisible" :title="detailTitle" class="detail-dialog" width="470px" :close-on-click-modal="false">
      <span class="detail-title">{{ courseName }}</span>
      <el-form :model="detailForm" :rules="formRule" ref="detailForm" class="detail-form">
        <el-form-item prop="a_time">
          <span class="detail-span">上课时间：</span>
          <el-date-picker
          v-model="detailForm.c_date"
          type="datetime"
          placeholder="请选择上课开始时间"
          class="detail-input"
          size="small"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="a_place">
          <span class="detail-span">上课地点：</span><el-input v-model="detailForm.c_place" class="detail-input" size="small"></el-input>
        </el-form-item>
        <el-form-item prop="a_lecturer">
          <span class="detail-span">主讲人：</span>
          <el-select v-model="detailForm.c_lecturer_id" size="small">
            <el-option v-for="(item, key) in lecturerList" :key="key" :label="item.u_name" :value="item.u_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="a_max_number">
          <span class="detail-span">限制人数：</span><el-input v-model="detailForm.c_max_number" type="number" class="detail-input" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancel('detailForm');detailDlgVisible = false">取消</el-button>
        <el-button @click="doAddDetail">确定</el-button>
      </div>
    </el-dialog>
    <!-- 添加参与培训人员 -->
    <el-dialog :visible.sync="addStuVisible" title="添加培训人员" :close-on-click-modal="false" class="add-stu-dialog" width="450px">
      <span class="add-stu-title">{{ courseName }}</span>
      <div class="add-stu-tree-div">
        <el-tree
          ref="stutree"
          class="add-stu-tree"
          :data="stuTree"
          show-checkbox
          highlight-current-row
          node-key='value'
          :props="defaultProps"
          :default-checked-keys="defaultCheck"
          @node-click="stuNodeClick">
        </el-tree>
      </div>
      <div slot="footer">
        <el-button @click="addStuVisible = false">取消</el-button>
        <el-button @click="doAdd">确定</el-button>
      </div>
    </el-dialog>
    <!-- 查看已经添加的培训人员 -->
    <el-dialog :visible.sync="checkStuVisible" title="参训人员" class="check-dialog">
      <span class="check-title">{{ courseName }}</span>
      <el-table
      :data="checkStuData"
      border
      height="90%">
        <el-table-column prop="d_id" label="部门" width="100px" :formatter="departmentFormat"></el-table-column>
        <el-table-column prop="u_name" label="姓名" width="90px"></el-table-column>
        <el-table-column prop="u_sex" label="性别" width="60px"></el-table-column>
        <el-table-column prop="u_email" label="邮箱" show-overflow-tooltip></el-table-column>
        <el-table-column prop="u_education" label="学历" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      tableData: [],
      tableRadio: [],
      detailDlgVisible: false,
      courseName: '',
      detailForm: {
        c_date: '',
        c_place: '',
        c_number: 0,
        c_lecturer_id: '',
        c_max_number: 0
      },
      detailTitle: '添加课程详情',
      formRule: {
        c_date: [{ required: true, message: '*选择开课时间', trigger: 'blur' }],
        c_place: [{ required: true, message: '*请输入地点', trigger: 'blur' }],
        c_lecturer_id: [{ required: true, message: '*请输入主讲人', trigger: 'blur' }]
      },
      addStuVisible: false,
      stuData: [],
      stuSlection: [],
      checkStuData: [],
      checkStuVisible: false,
      stuTree: [],
      depStu: [],
      defaultProps: {
        children: 'child',
        label:'label'
      },
      defaultCheck: [],
      courseList: [],
      queryCourseName: '',
      lecturerList: [],
      departmentData: [],
      center: 'center',
      currentPage: 1,
      pageSize: 10,
      btnShow: true // 编辑详情、添加人员按钮是否显示
    }
  },
  mounted() {
    this.getTableData()
    this.departmentList()
    this.getLecturer()
    // console.log(this.userInfo);
    let r_id = JSON.parse(this.userInfo.r_id)
    // console.log(r_id);
    if (r_id.length === 1) {
      if (r_id[0] === '98d6a6f0-35d2-11ea-b6ad-4beebee6d9ee') {
        this.btnShow = false
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'getArrangeList',
      'addDetail',
      'addStu',
      'getDepartmentList',
      'getStuList',
      'getStuInfo',
      'applyToCourse',
      'getUserList'
    ]),
    handleSizeChange: function(val) {
      this.pageSize = val
      return this.pageSize
    },
    handleCurrentChange: function(val) {
      this.currentPage = val
      return this.currentPage
    },
    // 获取表格
    getTableData: function() {
      this.getArrangeList().then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
          this.courseList = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 导出表格数据
    outTab () {
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '课程安排.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    // 表格选中事件
    rowClick: function(item) {
      this.tableRadio = item
    },
    // 获取讲师列表
    getLecturer: function() {
      this.getUserList({ r_id: '9b5d8040-35cf-11ea-afa8-59c0f5f44ca9' }).then(res => {
        if (res.errno === 0) {
          this.lecturerList = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 打开添加/修改课程详情对话框
    detailDlg: function() {
      const row = this.tableRadio
      if (row.length === 0) {
        this.$message.warning('请选择要添加详情的课程')
      } else {
        this.detailTitle = '编辑课程详情'
        this.detailForm = Object.assign({}, row)
        this.courseName = row.c_name
        this.detailDlgVisible = true
      }
    },
    // 添加/修改课程详情确定按钮
    doAddDetail: function() {
      const row = this.tableRadio
      this.$refs['detailForm'].validate((valid) => {
        if (valid) {
          let params = {
            c_id: row.c_id,
            c_date: this.detailForm.c_date,
            c_lecturer_id: this.detailForm.c_lecturer_id,
            c_place: this.detailForm.c_place,
            c_max_number: this.detailForm.c_max_number
          }
          this.addDetail(params).then(res => {
            if (res.errno === 0) {
              this.$message.success('添加课程详情成功')
              this.detailDlgVisible = false
              this.getTableData()
              this.tableRadio = {}
            } else {
              this.$message.error(res.errmsg)
            }
          }).catch(error => { this.$message.error(error) })
        } else {
          return false
        }
      })
    },
    // 清除验证信息
    cancel: function(form) {
      this.$refs[form].clearValidate()
    },
    // 打开添加培训人员对话框
    addStuDlg: function() {
      let _this = this
      const row = _this.tableRadio
      if (row.length === 0) {
        _this.$message.warning('请选择要添加培训人员的课程')
      } else {
        _this.addStuVisible = true
        _this.defaultCheck = []
        _this.courseName = row.c_name
        let defaultCheck = []
        let rowStu = JSON.parse(row.c_stu)
        if (rowStu !== null) {
          setTimeout(() => {
            _this.$refs['stutree'].setCheckedNodes([])
            for (let i = 0; i < rowStu.length; i++) {
              defaultCheck.push(rowStu[i])
            }
            _this.defaultCheck = Array.from(new Set(defaultCheck))
          }, 50);
        } else {
          setTimeout(() => {
            _this.$refs['stutree'].setCheckedNodes([])
          }, 50);
          _this.defaultCheck = []
        }
      }
    },
    // 表格筛选
    filterHandler: function(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 添加培训人员
    doAdd: function() {
      const row = this.tableRadio
      const data = this.$refs['stutree'].getCheckedNodes().concat(this.$refs['stutree'].getHalfCheckedNodes())
      let stu = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].child === undefined) {
          stu.push(data[i].i_id)
        }
      }
      let params = {
        c_id: row.c_id,
        c_stu: JSON.stringify(stu),
        c_number: stu.length
      }
      this.addStu(params).then(res => {
        if (res.errno === 0) {
          this.$message.success('添加培训人员成功')
          this.addStuVisible = false
          this.getTableData()
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 获取参加培训人员的具体信息
    checkStu: function(item) {
      const row = this.tableRadio
      this.checkStuVisible = true
      this.courseName = item.c_name
      if (item.c_stu !== '') {
        this.getStuInfo({list: item.c_stu}).then(res => {
          if (res.errno === 0) {
            this.checkStuData = res.data
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      }
    },
    // 获取部门列表
    departmentList: function() {
      this.getDepartmentList().then(res => {
        if (res.errno ===0) {
          let data = res.data
          this.departmentData = res.data
          for (let i=0; i<data.length; i++) {
            this.stuTree.push({
              label: data[i].d_name,
              value: data[i].d_id,
              d_id: data[i].d_id,
              child: this.depStu
            })
          }
          for (let i = 0; i < this.stuTree.length; i++) {
            this.getStuList({d_id: this.stuTree[i].d_id}).then(res => {
            if (res.errno === 0) {
              const data = res.data
              let child = []
              for (let j = 0; j < data.length; j++) {
                child.push({
                  value: data[j].u_id,
                  i_id: data[j].u_id,
                  label: data[j].u_name
                })
              }
              this.stuTree[i].child = child
            }
          })
          }
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 添加学生列表点击事件
    stuNodeClick: function(item) {
      const d_id = item.value
    },
    // 申请加入课程
    apply: function() {
      const row = this.tableRadio
      console.log(row);
      let flag = false
      if (row === null || row.length === 0) {
        this.$message.warning('请选择要加入的课程')
        flag = false
      } else {
        let stuId = []
        let u_id = this.userInfo.u_id
        if (row.c_date === null && row.c_place === null) {
          this.$message.warning('此课程未安排，无法加入')
        } else {
          if (row.c_stu !== '' && row.c_stu !== null && row.c_stu !== '[]') {
            stuId = JSON.parse(row.c_stu)
            for (let i = 0; i < stuId.length; i++) {
              if (stuId[i] === u_id) {
                this.$message.error('申请失败，您已经加入此课程')
                flag = false
                break
              }
              else {
                flag = true
              }
            }
          } else {
            flag = true
          }
        }
        
        if (flag) {
          stuId.push(u_id)
          let params = {
            c_id: row.c_id,
            c_stu: JSON.stringify(stuId),
            c_number: stuId.length
          }
          this.applyToCourse(params).then(res => {
            if (res.errno === 0) {
              this.$message.success('加入课程"' + row.c_name + '"成功')
              this.getTableData()
            } else {
              this.$message.error(res.errmsg)
            }
          }).catch(error => { this.$message.error(error) })
        }
      }
    },
    // 查询
    query: function() {
      const courseName = this.queryCourseName
      if (courseName) {
        return this.tableData.filter(data => {
          return Object.keys(data).some(key => {
            let list = []
            if (String(data[key]).toLowerCase().indexOf(courseName) > -1) {
              list.push(data)
              this.tableData = list
            }
          })
        })
      } else {
        this.getTableData()
      }
    },
    // 讲师格式化显示
    lecturerFormat: function(row, column) {
      for (let i = 0; i < this.lecturerList.length; i++) {
        if (row.c_lecturer_id === this.lecturerList[i].u_id) {
          return this.lecturerList[i].u_name
        }
      }
    },
    // 部门格式化显示
    departmentFormat: function(row, column) {
      for (let i = 0; i < this.departmentData.length; i++) {
        if (row.d_id === this.departmentData[i].d_id) {
          return this.departmentData[i].d_name
        }
      }
    },
    // // 上课时间格式化显示
    // cDateFormat: function(row, column) {
    //   if (row.c_date !== null && row.c_date !== '') {
    //     let showData = ''
    //     // showData = row.c_date.substring(0,10) + ' ' + row.c_date.substring(11, 19)
    //     showData = typeof(row.c_date)
    //     return showData
    //   } else {
    //     return ''
    //   }
    // }
  }
}
</script>

<style scoped>
.query-header {
  line-height: 45px;
  min-width: 410px;
}
.operation-header {
  line-height: 45px;
  border-bottom: 1px solid rgb(210,226,255);
  min-width: 400px;
}
.detail-title {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 25px;
  margin-bottom: 5px;
}
.detail-input {
  width: 50%;
}
.detail-span {
  display: inline-block;
  width: 80px;
  padding-left: 50px;
}
.table-text-button {
  width: 100%;
  margin: 0px;
  display: inline-block;
  color: rgb(85,118,189);
  cursor: pointer;
}
.add-stu-title {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 25px;
}
.add-stu-tree-div {
  height: 93%;
  overflow-y: auto;
}
.check-title {
  width: 100%;
  display: inline-block;
  font-size: 25px;
  text-align: center;
}
.table-main {
  padding: 5px 10px;
  height: calc(100vh - 134px);
}
</style>
<style>
.detail-dialog .el-dialog__header {
  padding-bottom: 2px;
}
.detail-dialog .el-dialog__body {
  padding-top: 0px;
  padding-bottom: 5px;
}
.detail-form .el-form-item__error {
  margin-left: 133px;
}
.add-stu-dialog .el-dialog__header {
  padding-bottom: 2px;
}
.add-stu-dialog .el-dialog__body {
  height: calc(100vh - 400px);
  padding: 1px 35px 2px 35px;
  overflow: auto;
}
.add-stu-tree .el-tree-node:focus>.el-tree-node__content {
  background-color: rgb(210,226,255);
}
.add-stu-tree .el-tree-node__content:hover {
  background-color: rgb(232,240,255);
}
.check-dialog .el-dialog__header {
  padding-bottom: 2px;
}
.check-dialog .el-dialog__body {
  padding: 2px 10px 15px 10px;
  height: calc(100vh - 270px);
}
</style>