<template>
  <div class="check-result-container">
    <el-container>
      <el-header height="45px" class="check-result-header">Header</el-header>
      <el-main class="check-result-main">
        <el-table
        :data="tableData"
        height="100%">
          <el-table-column prop="c_name" label="课程名称" :align="center" width="85" />
          <el-table-column prop="a_lecturer" label="讲师" :align="center" width="70" />
          <el-table-column prop="a_time" label="时间" :align="center" show-overflow-tooltip />
          <el-table-column prop="c_hour" label="课时" :align="center" width="70" />
          <el-table-column label="成绩" :align="center">
            <el-table-column prop="enthusiasm" label="积极性" :align="center">
              <template slot-scope="scope">
                <span :class="[scope.row.enthusiasm >= 60 ? '' : 'bad-number']">{{ scope.row.enthusiasm }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="answer" label="回答问题" :align="center">
              <template slot-scope="scope">
                <span :class="[scope.row.answer >= 60 ? '' : 'bad-number']">{{ scope.row.answer }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="examine" label="考核" :align="center">
              <template slot-scope="scope">
                <span :class="[scope.row.examine >= 60 ? '' : 'bad-number']">{{ scope.row.examine }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="p_grade" label="最终成绩" :align="center">
              <template slot-scope="scope">
                <span :class="[scope.row.p_grade >= 60 ? '' : 'bad-number']">{{ scope.row.p_grade }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="p_pass" label="是否通过" :align="center" width="80" />
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
      tableData: [],
      center: 'center'
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    ...mapActions([
      'getCheckResult'
    ]),
    getTableData: function() {
      this.getCheckResult().then(res => {
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
.check-result-container {
  height: calc(100vh - 46px);
}
.check-result-header {
  line-height: 45px;
  border: 1px solid rgb(232,240,255);
}
.check-result-main {
  padding: 10px;
  height: calc(100vh - 91px);
}
.bad-number {
  color: rgb(206, 49, 49);
}
</style>
<style>
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
}
</style>