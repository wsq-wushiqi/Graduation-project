<template>
  <div class="check-result-container">
    <el-container>
      <el-header height="45px" class="check-result-header">
        <span class="query-span">课程名称：</span>
        <el-select v-model="queryCourseName" class="query-input" size="small" clearable @clear="query">
          <el-option v-for="(item, key) in courseList" :key="key" :value="item.c_id" :label="item.c_name"></el-option>
        </el-select>
        <el-button type="primary" plain size="small" icon="el-icon-search" @click="query">查询</el-button>
      </el-header>
      <el-main class="check-result-main">
        <el-table
        :data="tableData"
        height="100%">
          <el-table-column prop="c_name" label="课程名称" :align="center" width="140" />
          <el-table-column prop="c_lecturer_name" label="讲师" :align="center" width="110" />
          <el-table-column prop="c_date" label="时间" :align="center" show-overflow-tooltip />
          <el-table-column prop="c_hour" label="课时" :align="center" width="90" />
          <el-table-column label="成绩" :align="center">
            <el-table-column prop="enthusiasm" label="积极性" :align="center" width="90">
              <template slot-scope="scope">
                <span :class="[scope.row.enthusiasm >= 60 ? '' : 'bad-number']">{{ scope.row.enthusiasm }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="answer" label="回答问题" :align="center" width="90">
              <template slot-scope="scope">
                <span :class="[scope.row.answer >= 60 ? '' : 'bad-number']">{{ scope.row.answer }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="examine" label="考核" :align="center" width="90">
              <template slot-scope="scope">
                <span :class="[scope.row.examine >= 60 ? '' : 'bad-number']">{{ scope.row.examine }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="p_grade" label="最终成绩" :align="center" width="100">
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
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      center: 'center',
      queryCourseName: '',
      queryLecturer: '',
      courseList: []
    }
  },
  mounted() {
    this.getCheckResult()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'getMyCheckResult'
    ]),
    getCheckResult: function() {
      this.getMyCheckResult().then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
          this.courseList = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    getTableData: function() {
      this.getMyCheckResult({ c_id: this.queryCourseName }).then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    query: function() {
      this.getTableData()
    }
  }
}
</script>

<style scoped>
.check-result-container {
  height: calc(100vh - 46px);
}
.check-result-header {
  padding-top: 5px;
  border: 1px solid rgb(232,240,255);
}
.check-result-main {
  padding: 10px;
  height: calc(100vh - 91px);
}
.bad-number {
  color: rgb(206, 49, 49);
}
.query-span {
  display: inline-block;
  width: 90px;
}
.query-input {
  width: 200px;
  margin-right: 20px;
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