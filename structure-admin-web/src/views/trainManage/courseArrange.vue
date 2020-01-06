<template>
  <div>
    <el-container>
      <el-header class="query-header" height="45px">Header</el-header>
      <el-container>
        <el-header class="operation-header" height="45px">
          <el-button size="mini" @click="detailDlg">编辑详情</el-button>
          <el-button size="mini" @click="addStuDlg">添加人员</el-button>
          <el-button size="mini" @click="apply">加入课程</el-button>
        </el-header>
        <el-main class="table-main">
          <el-table
          :data="tableData"
          border
          highlight-current-row
          height="100%"
          @row-click="rowClick">
            <el-table-column label="选择" width="50px"><template slot-scope="scope"><el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio></template></el-table-column>
            <el-table-column prop='c_name' label="课程名称" width="100px"></el-table-column>
            <el-table-column prop='l_name' label="申请人" width="70px"></el-table-column>
            <el-table-column prop='a_time' label="上课时间" width="200px" show-overflow-tooltip></el-table-column>
            <el-table-column prop='a_place' label="上课地点"></el-table-column>
            <el-table-column prop='a_number' label="已选人数">
              <template slot-scope="scope">
                <el-button type="text" class="table-text-button" title="点击查看人员详情" @click="checkStu(scope.row)">{{scope.row.a_number}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="a_max_number" label="限制人数"></el-table-column>
            <el-table-column prop='a_lecturer' label="主讲人"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <!-- 添加/修改课程详情 -->
    <el-dialog :visible.sync="detailDlgVisible" :title="detailTitle" class="detail-dialog" :close-on-click-modal="false">
      <span class="detail-title">{{ courseName }}</span>
      <el-form :model="detailForm" :rules="formRule" ref="detailForm" class="detail-form">
        <el-form-item prop="a_time">
          <span class="detail-span">上课时间：</span>
          <el-date-picker
          v-model="detailForm.a_time"
          type="datetime"
          placeholder="请选择上课开始时间"
          class="detail-input"
          size="small"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item prop="a_place">
          <span class="detail-span">上课地点：</span><el-input v-model="detailForm.a_place" class="detail-input" size="small"></el-input>
        </el-form-item>
        <el-form-item prop="a_lecturer">
          <span class="detail-span">主讲人：</span><el-input v-model="detailForm.a_lecturer" class="detail-input" size="small"></el-input>
        </el-form-item>
        <el-form-item prop="a_max_number">
          <span class="detail-span">限制人数：</span><el-input v-model="detailForm.a_max_number" type="number" class="detail-input" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancel('detailForm');detailDlgVisible = false">取消</el-button>
        <el-button @click="doAddDetail">确定</el-button>
      </div>
    </el-dialog>
    <!-- 添加参与培训人员 -->
    <el-dialog :visible.sync="addStuVisible" title="添加培训人员" :close-on-click-modal="false" class="add-stu-dialog" width="400px">
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
        <el-table-column prop="d_name" label="部门" width="100px"></el-table-column>
        <el-table-column prop="i_name" label="姓名" width="90px"></el-table-column>
        <el-table-column prop="i_sex" label="性别" width="60px"></el-table-column>
        <el-table-column prop="i_age" label="年龄" width="60px"></el-table-column>
        <el-table-column prop="i_email" label="邮箱" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      tableRadio: [],
      detailDlgVisible: false,
      courseName: '',
      detailForm: {
        a_time: '',
        a_place: '',
        a_number: 0,
        a_lecturer: '',
        a_max_number: 0
      },
      detailTitle: '添加课程详情',
      formRule: {
        a_time: [{ required: true, message: '*选择开课时间', trigger: 'blur' }],
        a_place: [{ required: true, message: '*请输入地点', trigger: 'blur' }],
        a_lecturer: [{ required: true, message: '*请输入主讲人', trigger: 'blur' }]
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
      defaultCheck: []
    }
  },
  mounted() {
    this.getTableData()
    this.departmentList()
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
      'updateDetail',
      'addStu',
      'infoList',
      'getDepartmentList',
      'getStuList',
      'getStuInfo',
      'applyToCourse',
    ]),
    // 获取表格
    getTableData: function() {
      this.getArrangeList().then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 表格选中事件
    rowClick: function(item) {
      this.tableRadio = item
    },
    // 打开添加/修改课程详情对话框
    detailDlg: function() {
      const row = this.tableRadio
      if (row.c_name === undefined) {
        this.$message.warning('请选择要添加详情的课程')
      } else {
        if (row.a_id !== undefined) {
          this.detailTitle = '修改课程详情'
          this.detailForm = Object.assign({}, row)
        } else {
          this.detailTitle = '添加课程详情'
          this.detailForm = Object.assign({}, null)
        }
        this.courseName = row.c_name
        this.detailDlgVisible = true
      }
    },
    // 添加/修改课程详情确定按钮
    doAddDetail: function() {
      const row = this.tableRadio
      this.$refs['detailForm'].validate((valid) => {
        if (valid) {
          if (this.detailTitle === '添加课程详情') {
            let params = {
              c_id: row.c_id,
              time: this.detailForm.a_time,
              lecturer: this.detailForm.a_lecturer,
              place: this.detailForm.a_place,
              max_number: this.detailForm.a_max_number
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
            let params = {
              id: row.a_id,
              lecturer: this.detailForm.a_lecturer,
              place: this.detailForm.a_place,
              time: this.detailForm.a_time,
              max_number: this.detailForm.a_max_number
            }
            this.updateDetail(params).then(res => {
              if (res.errno === 0) {
                this.$message.success('修改'+row.c_name+'课程详情成功')
                this.detailDlgVisible = false
                this.getTableData()
                this.tableRadio = {}
              } else {
                this.$message.error(res.errmsg)
              }
            }).catch(error => { this.$message.error(error) })
          }
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
        let rowStu = JSON.parse(row.a_stu)
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
        a_id: row.a_id,
        a_stu: JSON.stringify(stu),
        a_number: stu.length
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
    checkStu: function(item) {
      const row = this.tableRadio
      this.checkStuVisible = true
      this.courseName = item.c_name
      if (item.a_stu !== '') {
        this.getStuInfo({list: item.a_stu}).then(res => {
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
                  value: data[j].i_id,
                  i_id: data[j].i_id,
                  label: data[j].i_name
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
    stuNodeClick: function(item) {
      const d_id = item.value
    },
    apply: function() {
      const row = this.tableRadio
      let flag = false
      if (row === null || row.length === 0) {
        this.$message.warning('请选择要加入的课程')
        flag = false
      } else {
        let stuId = []
        let i_id = this.userInfo.i_id
        if (row.a_stu !== '') {
          stuId = JSON.parse(row.a_stu)
          for (let i = 0; i < stuId.length; i++) {
            if (stuId[i] === i_id) {
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
        if (flag) {
          stuId.push(i_id)
          let params = {
            a_id: row.a_id,
            a_stu: JSON.stringify(stuId),
            a_number: stuId.length
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
  height: 100%;
  margin: 0px;
}
.add-stu-title {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 25px;
}
.add-stu-tree-div {
  height: 93%;
  overflow-y: scroll;
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
  height: calc(100vh - 270px);
  padding: 1px 35px 2px 35px;
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