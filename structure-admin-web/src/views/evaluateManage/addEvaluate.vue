<template>
  <div class="add-evaluate-container">
    <el-container>
      <el-header height="50px" class="add-evaluate-header">
        <span class="page-title">添加课程评价</span>
      </el-header>
      <el-main class="add-evaluate-main">
        <div>
          <span>请选择要评价的课程:</span>
          <el-select v-model="course" size="small">
            <el-option v-for="(item, key) in courseList" :key="key" :label="item.c_name" :value="item.c_name"></el-option>
          </el-select>
          <el-button size="small" @click="showDetail(course)">开始</el-button>
        </div>
        <div v-show="detailVisible" class="detail-div">
          <span class="detail-title">课程详细信息</span>
          <div class="detail-form">
            <el-form>
              <el-form-item class="detail-form-item">
                <span class="left-span">讲师：</span><span class="left-content">{{ courseMessage.a_lecturer }}</span><span class="right-span">类别：</span><span>{{ courseMessage.c_category }}</span>
              </el-form-item>
              <el-form-item class="detail-form-item">
                <span class="left-span">培训时间：</span><span class="left-content">{{ courseMessage.a_time }}</span><span class="right-span">培训地点：</span><span>{{ courseMessage.a_place }}</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div>
          <span>关于课程</span>
          <div>
            <el-form-item>
              <span>1.培训教材</span>
              <el-rate v-model="teachingMaterial"></el-rate>
            </el-form-item>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      course: '',
      courseList: [],
      courseMessage: [],
      detailVisible: false,
      // addForm: {
        teachingMaterial: ''
      // }
    }
  },
  mounted() {
    this.getCourseList()
  },
  methods: {
    ...mapActions([
      'getPlanList'
    ]),
    getCourseList: function() {
      this.getPlanList().then(res => {
        if (res.errno === 0) {
          this.courseList = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    showDetail: function(course) {
      console.log(course);
      for (let i = 0; i < this.courseList.length; i++) {
        if (course === this.courseList[i].c_name) {
          this.courseMessage = this.courseList[i]
          console.log(this.courseMessage);
          this.detailVisible = true
        }
      } 
    }
  }
}
</script>

<style scoped>
.add-evaluate-container {
  /* background-color: thistle; */
  height: calc(100vh - 46px);
}
.add-evaluate-main {
  height: calc(100vh - 90px);
}
.add-evaluate-header {
  /* background-color: steelblue; */
  border-bottom: 1px solid rgb(210,226,255);
  line-height: 50px;
}
.page-title {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 25px;
  color: rgb(115,115,115);
}
.detail-title {
  display: block;
  /* background-color: thistle; */
  width: 20%;
  float: left;
  text-align: center;
  /* height: 160px; */
  font-size: 14px;
  padding-top: 10px;
  /* padding: 10px 0px 0px 15px;
   */
}
.detail-form {
  /* background-color: steelblue; */
  width: 60%;
  float: left;
  /* height: 160px; */
}
.detail-form-item {
  margin-bottom: 0px;
}
.detail-div {
  /* background-color: tomato; */
  margin-top: 10px;
  border: 1px solid rgb(210,226,255);
  height: 76px;
}
.left-span {
  /* background-color: brown; */
  display: inline-block;
  width: 80px;
}
.right-span {
  /* background-color: brown; */
  display: inline-block;
  width: 80px;
}
.left-content {
  /* background-color: tomato; */
  display: inline-block;
  width: 150px;
}
</style>