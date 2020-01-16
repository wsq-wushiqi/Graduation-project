<template>
  <div class="lecturer-evaluate-container">
    <el-container>
      <el-header height="45px" class="lecturer-evaluate-header">Header</el-header>
      <el-main>
        <el-tabs v-model="activeTab" @tab-click="TabClick">
          <el-tab-pane label="课程评价" name="course">
            <el-table :data="tableData" border>
              <el-table-column prop="c_name" label="课程名称"></el-table-column>
              <el-table-column prop="c_hour" label="课时"></el-table-column>
              <el-table-column prop="c_date" label="上课时间"></el-table-column>
              <el-table-column prop="ce_fraction" label="评分"></el-table-column>
              <el-table-column prop="ce_advise" label="评价/建议">
                <template slot-scope="scope">
                  <span class="table-button" @click="clickCheck(scope.row.c_name, scope.row.ce_advise)">点击查看</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="教师评价" name="lecturer">
            <el-table :data="tableData" border>
              <el-table-column prop="u_name" label="教师姓名"></el-table-column>
              <el-table-column prop="d_name" label="部门"></el-table-column>
              <el-table-column prop="u_education" label="学历"></el-table-column>
              <el-table-column prop="le_fraction" label="评分"></el-table-column>
              <el-table-column prop="le_advise" label="评价/建议">
                <template slot-scope="scope">
                  <span class="table-button" @click="clickCheck(scope.row.u_name, scope.row.le_advise)">点击查看</span>
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
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      tableData: [],
      activeTab: 'course',
      adviseVisible: false,
      adviseTitle: '',
      adviseList: []
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    ...mapActions([
      'getCourseEvaluate',
      'getAllLecturerEvaluate'
    ]),
    TabClick: function() {
      this.getTableData()
    },
    getTableData: function() {
      if (this.activeTab === 'course') {
        this.getCourseEvaluate().then(res => {
          if (res.errno === 0) {
            this.tableData = res.data
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      } else if (this.activeTab === 'lecturer') {
        this.getAllLecturerEvaluate().then(res => {
          if (res.errno === 0) {
            this.tableData = res.data
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
.lecturer-evaluate-container {
  height: calc(100vh - 46px);
}
.lecturer-evaluate-header {
  line-height: 45px;
  border-bottom: 1px solid rgb(210,226,255);
}
.table-button {
  color: rgb(85,118,189);
  cursor: pointer;
  display: inline-block;
  width: 100%;
  margin: 0px;
}
.advise-title {
  display: inline-block;
  width: 100%;
  line-height: 30px;
  font-size: 25px;
  text-align: center;
}
.advise-ul {
  list-style: none;
  margin: 0px;
  padding: 0px 40px;
}
.advise-li {
  margin-bottom: 2px;
  height: 25px;
  line-height: 25px;
  border-bottom: 1px solid rgb(210,226,255);
}
</style>
<style>
.advise-dialog .el-dialog__header {
  padding: 15px 0px 0px 15px;
}
.advise-dialog .el-dialog__body {
  padding: 5px 10px 5px 10px;
  height: 300px;
}
</style>