<template>
  <div class="check-evaluate-container">
    <el-container>
      <el-header height="45px" class="check-evaluate-header">Header</el-header>
      <el-main class="check-evaluate-main">
        <el-tabs v-model="activeTab" type="border-card" @tab-click="tabClick">
          <el-tab-pane label="课程评价" class="course-tab-pane" name="course">
            <el-table :data="courseTable" border>
              <el-table-column label="课程" prop="c_name"></el-table-column>
              <el-table-column label="课时" prop="c_hour"></el-table-column>
              <el-table-column label="开课部门" prop="d_name"></el-table-column>
              <el-table-column label="评分" prop="ce_fraction"></el-table-column>
              <el-table-column label="意见/建议" prop="ce_advise"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="教师评价" class="course-tab-pane" name="lecturer">
            <el-table :data="lecturerTable" border>
              <el-table-column label="姓名" prop="l_name"></el-table-column>
              <el-table-column label="部门" prop="d_name"></el-table-column>
              <el-table-column label="学历" prop="l_education"></el-table-column>
              <el-table-column label="评分" prop="le_fraction"></el-table-column>
              <el-table-column label="学员评价" prop="le_advise"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="其他评价" class="course-tab-pane" name="other">其他评价</el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      activeTab: 'course',
      courseTable: [],
      lecturerTable: []
    }
  },
  mounted() {
    this.tabClick()
  },
  methods: {
    ...mapActions([
      'getCourseEvaluate',
      'getLecturerEvaluate',
      'getOtherEvaluate'
    ]),
    tabClick: function() {
      console.log(this.activeTab);
      if (this.activeTab === 'course') {
        this.getCourseEvaluate().then(res => {
          if (res.errno === 0) {
            // console.log(res.data);
            this.courseTable = res.data
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      } else if (this.activeTab === 'lecturer') {
        this.getLecturerEvaluate().then(res => {
          if (res.errno === 0) {
            // console.log(res.data);
            this.lecturerTable = res.data
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      } else if (this.activeTab === 'other') {
        this.getOtherEvaluate().then(res => {
          if (res.errno === 0) {
            console.log(res.data);
            
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      }
    }
  }
}
</script>

<style scoped>
.check-evaluate-container {
  height: calc(100vh - 46px);
  /* background-color: yellowgreen; */
}
.check-evaluate-header {
  /* background-color: yellowgreen; */
  border-bottom: 1px solid rgb(210,226,255);
  line-height: 45px;
}
.check-evaluate-main {
  height: calc(100vh - 91px);
  padding: 10px;
  /* background-color: rgb(125, 151, 173); */
}
.course-tab-pane {
  /* background-color: coral; */
  /* height: 100%; */
  height: calc(100vh - 182px);
  overflow-y: scroll;
}
</style>
<style>
.el-tabs__nav-scroll {
  background-color: rgb(232,240,255);
}
.el-tabs :hover {
  /* background-color: rgb(232,240,255); */
  color: rgb(120, 111, 167)!important;
}
.el-tabs__item.is-active {
  /* background-color: yellowgreen!important; */
  color: rgb(73, 64, 112)!important;
}
</style>