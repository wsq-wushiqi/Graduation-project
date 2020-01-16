<template>
  <div class="check-evaluate-container">
    <el-container>
      <el-main class="check-evaluate-main">
        <el-tabs v-model="activeTab" type="border-card" @tab-click="tabClick">
          <el-tab-pane label="课程评价" class="course-tab-pane" name="course">
            <el-table :data="courseTable" border>
              <el-table-column label="课程" prop="c_name"></el-table-column>
              <el-table-column label="课时" prop="c_hour"></el-table-column>
              <el-table-column label="上课时间" prop="c_date"></el-table-column>
              <el-table-column label="评分" prop="ce_fraction"></el-table-column>
              <el-table-column label="意见/建议" prop="ce_advise">
                <template slot-scope="scope">
                  <span class="table-button" @click="clickCheck(scope.row.c_name, scope.row.ce_advise)">点击查看</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="教师评价" class="course-tab-pane" name="lecturer">
            <el-table :data="lecturerTable" border>
              <el-table-column label="姓名" prop="u_name"></el-table-column>
              <el-table-column label="部门" prop="d_name"></el-table-column>
              <el-table-column label="学历" prop="u_education"></el-table-column>
              <el-table-column label="评分" prop="le_fraction"></el-table-column>
              <el-table-column label="学员评价" prop="le_advise">
                <template slot-scope="scope">
                  <span class="table-button" @click="clickCheck(scope.row.l_name, scope.row.le_advise)">点击查看</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <el-dialog
    :visible.sync="adviseVisible"
    title="查看意见和建议"
    class="advise-dialog"
    :close-on-click-modal="false">
      <span class="advise-title">{{ adviseTitle }}</span>
      <ul class="advise-ul">
        <li v-for="(item, key) in adviseList" :key="key" class="advise-li">{{ item }}</li>
      </ul>
      <div slot="footer">
        <el-button @click="adviseVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      activeTab: 'course',
      courseTable: [],
      lecturerTable: [],
      adviseVisible:false,
      adviseList: [],
      adviseTitle: ''
    }
  },
  mounted() {
    this.tabClick()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'getCourseEvaluate',
      'getLecturerEvaluate',
      'getLecturerCourseEvaluate'
    ]),
    tabClick: function() {
      if (this.activeTab === 'course') {
        this.getLecturerCourseEvaluate().then(res => {
          if (res.errno === 0) {
            this.courseTable = res.data
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      } else if (this.activeTab === 'lecturer') {
        this.getLecturerEvaluate().then(res => {
          if (res.errno === 0) {
            this.lecturerTable = res.data
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      }
    },
    clickCheck: function(title, item) {
      this.adviseVisible = true
      this.adviseList = item.split(',')
      this.adviseTitle = title
    }
  }
}
</script>

<style scoped>
.check-evaluate-container {
  height: calc(100vh - 46px);
}
.check-evaluate-header {
  border-bottom: 1px solid rgb(210,226,255);
  line-height: 45px;
}
.check-evaluate-main {
  height: calc(100vh - 46px);
  padding: 10px;
}
.course-tab-pane {
  height: calc(100vh - 137px);
  overflow-y: auto;
}
.advise-ul {
  list-style: none;
  margin: 0px;
  padding: 0px 40px;
}
.advise-title {
  display: inline-block;
  width: 100%;
  line-height: 30px;
  font-size: 25px;
  text-align: center;
}
.advise-li {
  margin-bottom: 2px;
  height: 25px;
  line-height: 25px;
  border-bottom: 1px solid rgb(210,226,255);
}
.table-button {
  color: rgb(85,118,189);
  cursor: pointer;
  display: inline-block;
  width: 100%;
  margin: 0px;
}
</style>
<style>
.el-tabs__nav-scroll {
  background-color: rgb(232,240,255);
}
.el-tabs :hover {
  color: rgb(120, 111, 167)!important;
}
.el-tabs__item.is-active {
  color: rgb(73, 64, 112)!important;
}
.advise-dialog .el-dialog__header {
  padding: 15px 0px 0px 15px;
}
.advise-dialog .el-dialog__body {
  padding: 5px 10px 5px 10px;
  height: 300px;
}
</style>