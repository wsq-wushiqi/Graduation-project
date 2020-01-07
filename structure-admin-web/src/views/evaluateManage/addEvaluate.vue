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
        <div class="course-div">
          <span>关于课程</span>
          <div>
            <el-form>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">1.培训教材:{{ courseForm.teachingMaterial }}分</span><el-rate v-model="courseForm.teachingMaterial" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">4.课程针对性:{{ courseForm.pertinence }}分</span><el-rate v-model="courseForm.pertinence" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">2.培训形式:{{ courseForm.trainingMode }}分</span><el-rate v-model="courseForm.trainingMode" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">5.课程内容实用性:{{ courseForm.practicality }}分</span><el-rate v-model="courseForm.practicality" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">3.课程内容充实性:{{ courseForm.contentEnrichment }}分</span><el-rate v-model="courseForm.contentEnrichment" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">6.练习活动:{{ courseForm.practice }}分</span><el-rate v-model="courseForm.practice" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="course-div">
          <span>关于讲师</span>
          <div>
            <el-form>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">1.表达能力:{{ lecturerForm.expression }}分</span><el-rate v-model="lecturerForm.expression" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">4.板书水平:{{ lecturerForm.blackboardWriting }}分</span><el-rate v-model="lecturerForm.blackboardWriting" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">2.感染力:{{ lecturerForm.infection }}分</span><el-rate v-model="lecturerForm.infection" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">5.综合评价:{{ lecturerForm.comprehensive }}分</span><el-rate v-model="lecturerForm.comprehensive" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">3.理论水平:{{ lecturerForm.theoreticalLevel }}分</span><el-rate v-model="lecturerForm.theoreticalLevel" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <!-- <span class="course-form-span">6.练习活动:{{ lecturerForm.contentEnrichment }}分</span><el-rate v-model="lecturerForm.contentEnrichment" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate> -->
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="course-div">
          <span>关于组织工作</span>
          <div>
            <el-form>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">1.场地安排:{{ organizeForm.place }}分</span><el-rate v-model="organizeForm.place" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">4.其他安排:{{ organizeForm.other }}分</span><el-rate v-model="organizeForm.other" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">2.纪律要求:{{ organizeForm.discipline }}分</span><el-rate v-model="organizeForm.discipline" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <!-- <div class="course-form-item-left">
                  <span class="course-form-span">5.综合评价:{{ lecturerForm.comprehensive }}分</span><el-rate v-model="lecturerForm.comprehensive" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div> -->
              </el-form-item>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">3.食宿安排:{{ organizeForm.boardAndLodging}}分</span><el-rate v-model="organizeForm.boardAndLodging" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <!-- <span class="course-form-span">6.练习活动:{{ lecturerForm.contentEnrichment }}分</span><el-rate v-model="lecturerForm.contentEnrichment" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate> -->
                </div>
              </el-form-item>
            </el-form>
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
      courseForm: {
        teachingMaterial: null, // 培训教材
        trainingMode: null,    // 培训形式
        contentEnrichment: null, // 课程内容充实性
        pertinence: null, // 课程针对性
        practicality: null, // 实用性
        practice: null // 练习
      },
      lecturerForm: {
        expression: null, // 表达能力
        infection: null, // 感染力
        theoreticalLevel: null, // 理论水平
        blackboardWriting: null, // 板书水平
        comprehensive: null // 综合评价
      },
      organizeForm: {
        place: null, // 场地
        discipline: null, // 纪律
        boardAndLodging: null, // 食宿
        other: null // 其他安排
      },
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
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
    },
    scoreChange: function(score) {
      // console.log(score);
      console.log(this.courseForm.teachingMaterial);
      
      
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
.course-form-item {
  /* background-color: thistle; */
  width: 100%;
  float: left;
  vertical-align: middle;
  margin-bottom: 0px;
}
.course-form-span {
  /* background-color: thistle; */
  float: left;
  width: 150px;
  margin-right: 20px;
  /* height: 40px; */
  /* vertical-align: top; */
  /* display: inline-block; */
  /* width: 300px; */
}
.course-form-rate {
  /* background-color: tomato; */
  width: 370px;
  /* height: 40px; */
  margin-top: 10px;
}
.course-div {
  /* background-color: coral; */
  height: 160px;
  margin-top: 5px;
  border: 1px solid rgb(210,226,255);
  padding: 3px 0px 0px 5px;
}
.course-form-item-left {
  /* background-color: coral; */
  width: 50%;
  float: left;
}
</style>
<style>
.el-rate {
  /* background-color: thistle; */
  vertical-align: middle;
}
</style>