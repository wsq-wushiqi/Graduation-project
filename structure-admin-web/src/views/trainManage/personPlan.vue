<template>
  <div class="person-plan-container">
    <el-container>
      <el-header height="50px" class="person-plan-header"><span>我的课程</span></el-header>
      <el-main class="person-plan-main">
        <el-card class="box-card" shadow="hover" v-for="(item, key) in listData" :key="key">
          <div slot="header" class="clearfix">
            <span class="card-title">{{ item.c_name }}</span>
            <el-button type="text" class="card-button" @click="addEvaluate(item)">添加评价</el-button>
          </div>
          <div>
            <el-form>
              <el-form-item class="card-form-item back-1">
                <span class="card-form-title">上课时间：</span><span>{{ item.c_date }}</span>
              </el-form-item>
              <el-form-item class="card-form-item back-2">
                <span class="card-form-title">地点：</span><span>{{ item.c_place }}</span>
              </el-form-item>
              <el-form-item class="card-form-item back-1">
                <span class="card-form-title">课时：</span><span>{{ item.c_hour }}</span>
              </el-form-item>
              <el-form-item class="card-form-item back-2">
                <span class="card-form-title">课程类别：</span><span>{{ item.c_category }}</span>
              </el-form-item>
              <el-form-item class="card-form-item back-1">
                <span class="card-form-title">主讲人：</span><span>{{ item.c_lecturer_name }}</span>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="evaluateVisible"></el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      listData: [],
      evaluateVisible: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...mapActions([
      'getStuPlanList'
    ]),
    getData: function() {
      this.getStuPlanList().then(res => {
        if (res.errno === 0) {
          this.listData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    addEvaluate: function(item) {
      let date = new Date()
      let nyear = date.getFullYear()
      let nmonth = date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1
      let nday = date.getDate()<10 ? "0"+date.getDate() : date.getDate()
      let rowdate = item.c_date.split('-')
      if (rowdate[0] < nyear || rowdate[1] < nmonth || rowdate[2].split(' ')[0] < nday) {
        this.$router.push('/addEvaluate')
      } else {
        this.$message.error('课程"' + item.c_name + '"未结束，不能评价')
      }
    }
  }
}
</script>

<style scoped>
.person-plan-container {
  height: calc(100vh - 46px);
  overflow-y: scroll;
}
.person-plan-main {
  height: 100%;
}
.card-form-item {
  margin-bottom: 5px;
}
.card-button {
  margin-right: 5px;
  float: right;
}
.card-form-title {
  display: inline-block;
  width: 80px;
}
.back-1 {
  background-color: rgba(232, 247, 255, 0.568);
}
.back-2 {
  background-color: rgba(220, 210, 255, 0.199);
}
.person-plan-header {
  line-height: 50px;
  border-bottom: 1px solid rgb(210,226,255);
}
</style>
<style>
.card-title {
  display: inline-block;
  width: 300px;
  font-size: 25px;
}
.text {
    font-size: 14px;
  }
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
  margin-bottom: 15px;
  border: 1px solid rgb(210,226,255);
}
.box-card .el-card__header {
  padding: 5px 20px;
  border-bottom: 1px solid rgb(210,226,255);
}
.box-card .el-card__body {
  padding: 10px 70px;
}
</style>