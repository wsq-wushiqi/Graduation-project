<template>
  <div class="examine-container">
    <el-container>
      <el-main class="examine-main">
        <el-tabs v-model="activeTab" type="border-card" @tab-click="tabClick(activeTab)">
          <el-tab-pane v-for="(item, key) in courseList" :key="key" :label="item.c_name" :name="item.c_id" class="examine-tab-pane">
            <el-table
            :data="tableData"
            height="calc(100vh - 120px)"
            border>
              <el-table-column type="index" label="序号" width="50px" :align="center"></el-table-column>
              <el-table-column prop="d_name" label="部门" :align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="u_name" label="姓名" :align="center"></el-table-column>
              <el-table-column prop="enthusiasm" label="积极性" width="100" sortable :align="center">
                <template slot-scope="scope">
                  <span :class="[scope.row.enthusiasm >= 60 ? '' : 'bad-number']">{{ scope.row.enthusiasm }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="answer" label="回答问题" width="110" sortable :align="center">
                <template slot-scope="scope">
                  <span :class="[scope.row.answer >= 60 ? '' : 'bad-number']">{{ scope.row.answer }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="examine" label="考核成绩" width="110" sortable :align="center">
                <template slot-scope="scope">
                  <span :class="[scope.row.examine >= 60 ? '' : 'bad-number']">{{ scope.row.examine }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="p_grade" label="综合成绩" width="110" sortable :align="center">
                <template slot-scope="scope">
                  <span :class="[scope.row.p_grade >= 60 ? '' : 'bad-number']">{{ scope.row.p_grade }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="p_pass" label="是否通过" width="110" sortable :align="center"></el-table-column>
              <el-table-column label="操作" :align="center" width="100">
                <template slot-scope="scope">
                  <span class="table-button" @click="editGrade(scope.row)">编辑成绩</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="gradeDlgVisible" title="编辑成绩" class="grade-class" width="400px" :close-on-click-modal="false">
      <span class="grade-dialog-title">{{ stuName }}</span>
      <el-form>
        <el-form-item class="grade-form-item">
          <span class="grade-form-span">积极性：</span><el-input type='number' v-model="gradeForm.enthusiasm" class="grade-form-input" size="small" @input="gradeInput"></el-input>
        </el-form-item>
        <el-form-item class="grade-form-item">
          <span class="grade-form-span">回答问题：</span><el-input type='number' v-model="gradeForm.answer" class="grade-form-input" size="small" @input="gradeInput"></el-input>
        </el-form-item>
        <el-form-item class="grade-form-item">
          <span class="grade-form-span">考核成绩：</span><el-input type='number' v-model="gradeForm.examine" class="grade-form-input" size="small" @input="gradeInput"></el-input>
        </el-form-item>
        <el-form-item class="grade-form-item">
          <span class="grade-form-span">综合成绩：</span><span :class="[gradeForm.p_grade >= 60 ? 'good-grade' : 'bad-grade']">{{ gradeForm.p_grade }}</span>
        </el-form-item>
        <el-form-item class="grade-form-item">
          <span class="grade-form-span">是否通过：</span>
          <el-radio-group v-model="gradeForm.p_pass">
            <el-radio v-for="(item, key) in passList" :key="key" :label="item.label" :value="item.label"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="gradeDlgVisible = false">取消</el-button>
        <el-button @click="commitGrade">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      courseList: [],
      activeTab: '',
      tableData: [],
      gradeDlgVisible: false,
      stuName: '',
      radioList: [],
      passList: [{
        label: '是'
      }, {
        label: ' 否'
      }],
      gradeForm: {
        c_id: '',
        u_id: '',
        enthusiasm: 0,
        answer: 0,
        examine: 0,
        p_grade: 0,
        p_pass: ''
      },
      center: 'center',
      passValue: ''
    }
  },
  mounted() {
    this.getCourse()
  },
  methods: {
    ...mapActions([
      'getMyCourse',
      'getCourseStu',
      'editStuGeade',
      'getDepartmentList' // 获取部门列表
    ]),
    getDepartment: function() {
      this.getDepartmentList().then(res => {
        if (res.errno === 0) {
          this.radioList = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    getCourse: function() {
      this.getMyCourse().then(res => {
        if (res.errno === 0) {
          this.courseList = res.data
          this.activeTab = res.data[0].c_id
          this.getTableData()
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    tabClick: function(item) {
      this.getTableData()
    },
    getTableData: function() {
      this.getCourseStu({ c_id: this.activeTab, d_id: this.passValue }).then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    editGrade: function(item) {
      if (item.p_grade !== undefined) {
        this.gradeForm = Object.assign({}, item)
      } else {
        this.gradeForm.p_grade = 0
        this.gradeForm.enthusiasm = 0
        this.gradeForm.examine = 0
        this.gradeForm.answer = 0
      }
      this.gradeDlgVisible = true
      this.stuName = item.u_name
      this.gradeForm.u_id = item.u_id
    },
    commitGrade: function() {
      let params = {
        c_id: this.activeTab,
        u_id: this.gradeForm.u_id,
        enthusiasm: this.gradeForm.enthusiasm,
        answer: this.gradeForm.answer,
        examine: this.gradeForm.examine,
        p_grade: this.gradeForm.p_grade,
        p_pass: this.gradeForm.p_pass,
        p_evaluate: ''
      }
      this.editStuGeade(params).then(res => {
        if (res.errno === 0) {
          this.$message.success('提交成功')
          this.gradeDlgVisible = false
          this.getTableData()
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    gradeInput: function() {
      this.gradeForm.p_grade = parseFloat((Number(this.gradeForm.enthusiasm) + Number(this.gradeForm.answer) + Number(this.gradeForm.examine))/3).toFixed(2)
    }
  }
}
</script>

<style scoped>
.examine-container {
  height: calc(100vh - 46px);
}
.examine-main {
  height: calc(100vh - 46px);
  padding: 10px 10px 0px 10px;
}
.grade-form-span {
  display: inline-block;
  width: 90px;
}
.grade-form-input {
  width: 200px;
}
.grade-form-item {
  margin-bottom: 5px;
}
.grade-dialog-title {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 20px;
}
.good-grade {
  font-size: 20px;
  color: #5576bd;
}
.bad-grade {
  font-size: 20px;
  color: rgb(219, 77, 77);
}
.bad-number {
  color: rgb(206, 49, 49);
}
.table-button {
  cursor: pointer;
  color: #5576bd;
}
.examine-tab-pane {
  height: calc(100vh - 135px);
}
</style>
<style>
.grade-class .el-dialog__header {
  padding: 13px 0px 3px 15px; 
}
.grade-class .el-dialog__body {
  padding: 6px 20px;
}
</style>