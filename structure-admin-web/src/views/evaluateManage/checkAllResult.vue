<template>
  <div class="check-all-result-container">
    <el-container>
      <el-header height="45px" class="check-all-result-header">Header</el-header>
      <el-main class="check-all-result-main">
        <el-table :data="tableData">
          <el-table-column prop="u_name" label="姓名"></el-table-column>
          <el-table-column prop="d_name" label="员工部门"></el-table-column>
          <el-table-column prop="c_name" label="课程"></el-table-column>
          <el-table-column prop="c_hour" label="课时"></el-table-column>
          <el-table-column prop="c_date" label="时间" sortable show-overflow-tooltip></el-table-column>
          <el-table-column prop="c_lecturer_name" label="讲师"></el-table-column>
          <el-table-column label="成绩">
            <el-table-column prop="enthusiasm" label="积极性" sortable :align="center" width="90">
              <template slot-scope="scope">
                <span :class="[scope.row.enthusiasm >= 60 ? '' : 'bad-number']">{{ scope.row.enthusiasm }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="answer" label="回答问题" sortable :align="center" width="110">
              <template slot-scope="scope">
                <span :class="[scope.row.answer >= 60 ? '' : 'bad-number']">{{ scope.row.answer }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="examine" label="考核" sortable :align="center" width="90">
              <template slot-scope="scope">
                <span :class="[scope.row.examine >= 60 ? '' : 'bad-number']">{{ scope.row.examine }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="p_grade" label="最终成绩" sortable :align="center" width="110">
              <template slot-scope="scope">
                <span :class="[scope.row.p_grade >= 60 ? '' : 'bad-number']">{{ scope.row.p_grade }}</span>
              </template>
            </el-table-column>
          <el-table-column prop="p_pass" label="是否通过"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    ...mapActions([
      'getAllCheckResult'
    ]),
    getTableData: function() {
      this.getAllCheckResult().then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    }
  }
}
</script>

<style scoped>
.check-all-result-container {
  height: calc(100vh - 46px);
}
.check-all-result-header {
  line-height: 45px;
  border-bottom: 1px solid rgb(210,226,255);
}
.check-all-result-main {
  height: calc(100vh - 91px);
}
.bad-number {
  color: rgb(206, 49, 49);
}
</style>