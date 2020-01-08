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
          <span>课程详细信息</span>
            <el-form>
              <el-form-item class="detail-form-item">
                <div class="course-form-item-left">
                  <span class="left-span">讲师：</span><span class="left-content">{{ courseMessage.a_lecturer }}</span>
                </div>
                <div class="course-form-item-left">
                  <span class="right-span">类别：</span><span>{{ courseMessage.c_category }}</span>
                </div>
              </el-form-item>
              <el-form-item class="detail-form-item">
                <div class="course-form-item-left">
                  <span class="left-span">培训时间：</span><span class="left-content">{{ courseMessage.a_time }}</span>
                </div>
                <div class="course-form-item-left">
                  <span class="right-span">培训地点：</span><span>{{ courseMessage.a_place }}</span>
                </div>
              </el-form-item>
            </el-form>
        </div>
        <div v-show="detailVisible" class="course-div">
          <span>关于课程</span>
          <span class="course-total-span">总体：<span class="course-total-score">{{ courseTotal }}</span>分</span>
          <div>
            <el-form>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">1.培训教材:<span class="course-form-score">{{ courseForm.teachingMaterial }}</span>分</span><el-rate v-model="courseForm.teachingMaterial" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">4.课程针对性:<span class="course-form-score">{{ courseForm.pertinence }}</span>分</span><el-rate v-model="courseForm.pertinence" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">2.培训形式:<span class="course-form-score">{{ courseForm.trainingMode }}</span>分</span><el-rate v-model="courseForm.trainingMode" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">5.课程内容实用性:<span class="course-form-score">{{ courseForm.practicality }}</span>分</span><el-rate v-model="courseForm.practicality" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">3.课程内容充实性:<span class="course-form-score">{{ courseForm.contentEnrichment }}</span>分</span><el-rate v-model="courseForm.contentEnrichment" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">6.练习活动:<span class="course-form-score">{{ courseForm.practice }}</span>分</span><el-rate v-model="courseForm.practice" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <span class="course-advise-span">对于此次课程的意见/建议：</span><el-input v-model="courseForm.advise" size="small" class="course-input"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-show="detailVisible" class="course-div">
          <span>关于讲师</span>
          <span class="course-total-span">总体：<span class="course-total-score">{{ lecturerTotal }}</span>分</span>
          <div>
            <el-form>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">1.表达能力:<span class="course-form-score">{{ lecturerForm.expression }}</span>分</span><el-rate v-model="lecturerForm.expression" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">4.板书水平:<span class="course-form-score">{{ lecturerForm.blackboardWriting }}</span>分</span><el-rate v-model="lecturerForm.blackboardWriting" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">2.感染力:<span class="course-form-score">{{ lecturerForm.infection }}</span>分</span><el-rate v-model="lecturerForm.infection" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">5.综合评价:<span class="course-form-score">{{ lecturerForm.comprehensive }}</span>分</span><el-rate v-model="lecturerForm.comprehensive" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">3.理论水平:<span class="course-form-score">{{ lecturerForm.theoreticalLevel }}</span>分</span><el-rate v-model="lecturerForm.theoreticalLevel" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <span class="course-advise-span">对于此次课程的意见/建议：</span><el-input v-model="lecturerForm.advise" size="small" class="course-input"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-show="detailVisible" class="organize-div">
          <span>关于组织工作</span>
          <span class="course-total-span">总体：<span class="course-total-score">{{ organizeTotal }}</span>分</span>
          <div>
            <el-form>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">1.场地安排:<span class="course-form-score">{{ organizeForm.place }}</span>分</span><el-rate v-model="organizeForm.place" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">3.食宿安排:<span class="course-form-score">{{ organizeForm.boardAndLodging}}</span>分</span><el-rate v-model="organizeForm.boardAndLodging" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <div class="course-form-item-left">
                  <span class="course-form-span">2.纪律要求:<span class="course-form-score">{{ organizeForm.discipline }}</span>分</span><el-rate v-model="organizeForm.discipline" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
                <div class="course-form-item-left">
                  <span class="course-form-span">4.其他安排:<span class="course-form-score">{{ organizeForm.other }}</span>分</span><el-rate v-model="organizeForm.other" class="course-form-rate" :colors="colors" show-score allow-half @change="scoreChange"></el-rate>
                </div>
              </el-form-item>
              <el-form-item class="course-form-item">
                <span class="course-advise-span">对于此次课程的意见/建议：</span><el-input v-model="organizeForm.advise" size="small" class="course-input"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-show="detailVisible" class="commit-button">
          <el-button size="small" @click="commit">提交</el-button>
          <el-button size="small" @click="reset">重置</el-button>
        </div>
        <div v-show="evaluateDetail" class="alert-text-div">
          <img src="../../image/error_cat.png" alt="出错啦。。" width="128px">
          <span class="alert-text-span">{{ alertText }}</span>
        </div>
        <!-- <div v-show="evaluateDetail">
          <el-form>
            <el-form-item>
              <span>关于课程：<span>{{ detailForm.course }}</span>分</span>
              <span>意见和建议：<span>{{ detailForm.courseAdvise }}</span></span>
            </el-form-item>
            <el-form-item>
              <span>关于讲师：<span>{{ detailForm.lecturer }}</span>分</span>
              <span>意见和建议：<span>{{ detailForm.lecturerAdvise }}</span></span>
            </el-form-item>
            <el-form-item>
              <span>关于组织工作：<span>{{ detailForm.organize }}</span>分</span>
              <span>意见和建议：<span>{{ detailForm.organizeAdvise }}</span></span>
            </el-form-item>
          </el-form>
        </div> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
        practice: null, // 练习
        // total: 0 // 总体
        advise: '' // 意见和建议
      },
      courseTotal: 0.00,
      lecturerForm: {
        expression: null, // 表达能力
        infection: null, // 感染力
        theoreticalLevel: null, // 理论水平
        blackboardWriting: null, // 板书水平
        comprehensive: null, // 综合评价
        advise: '' // 意见和建议
        // total: 0 // 总体
      },
      lecturerTotal: 0.00,
      organizeForm: {
        place: null, // 场地
        discipline: null, // 纪律
        boardAndLodging: null, // 食宿
        other: null, // 其他安排
        advise: '' // 意见和建议
        // total: 0 // 总体
      },
      organizeTotal: 0.00,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      evaluateDetail: false,
      alertText: ''
      // detailForm: {
      //   course: 0.00,
      //   courseAdvise: '',
      //   lecturer: 0.00,
      //   lecturerAdvise: '',
      //   organize: 0.00,
      //   organizeAdvise: ''
      // }
    }
  },
  mounted() {
    this.getCourseList()
  },
  methods: {
    ...mapActions([
      'getPlanList',
      'addEvaluate',
      'checkEvaluate'
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
      for (let i = 0; i < this.courseList.length; i++) {
        if (course === this.courseList[i].c_name) {
          this.courseMessage = this.courseList[i]
          let params = {
            i_id: this.userInfo.i_id,
            c_id: this.courseMessage.c_id
          }
          this.checkEvaluate(params).then(res => {
            if (res.errno === 0) {
              this.detailVisible = true
              this.evaluateDetail = false
            } else {
              this.detailVisible = false
              this.evaluateDetail = true
              this.alertText = '换一个吧，您已经评价过课程“'+this.courseMessage.c_name+'”啦~'
              // this.$message.info(res.errmsg)
            }
          }).catch(error => { this.$message.error(error) })
        }
      } 
    },
    scoreChange: function() {
      this.courseTotal = parseFloat((this.courseForm.teachingMaterial + this.courseForm.trainingMode + this.courseForm.contentEnrichment + this.courseForm.pertinence + this.courseForm.practicality + this.courseForm.practice)/6.0).toFixed(2)
      this.lecturerTotal = parseFloat((this.lecturerForm.expression + this.lecturerForm.infection + this.lecturerForm.theoreticalLevel + this.lecturerForm.blackboardWriting + this.lecturerForm.comprehensive)/5.0).toFixed(2)
      this.organizeTotal = parseFloat((this.organizeForm.place + this.organizeForm.discipline + this.organizeForm.boardAndLodging + this.organizeForm.other)/4.0).toFixed(2)
    },
    commit: function() {
      let i_id = this.userInfo.i_id
      let c_id = this.courseMessage.c_id
      let params = {
        i_id: this.userInfo.i_id,
        l_id: this.courseMessage.l_id,
        c_id: this.courseMessage.c_id,
        courseScore: this.courseTotal,
        courseAdvise: this.courseForm.advise,
        lecturerScore: this.lecturerTotal,
        lecturerAdvise: this.lecturerForm.advise,
        otherFraction: this.organizeTotal,
        otherAdvise: this.organizeForm.advise,
        place: this.organizeForm.place,
        discipline: this.organizeForm.discipline,
        boardAndLodging: this.organizeForm.boardAndLodging,
        other: this.organizeForm.other
      }
      this.addEvaluate(params).then(res => {
        if (res.errno === 0) {
          this.$message.success('提交成功')
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    reset: function() {
      this.courseForm.teachingMaterial = 0
      this.courseForm.trainingMode = 0
      this.courseForm.contentEnrichment = 0
      this.courseForm.pertinence = 0
      this.courseForm.practicality = 0
      this.courseForm.practice = 0
      this.organizeForm.expression = 0
      this.organizeForm.infection = 0
      this.organizeForm.theoreticalLevel = 0
      this.organizeForm.blackboardWriting = 0
      this.organizeForm.comprehensive = 0
      this.lecturerForm.place = 0
      this.lecturerForm.discipline = 0
      this.lecturerForm.boardAndLodging = 0
      this.lecturerForm.other = 0
      this.courseTotal = 0.00
      this.lecturerTotal  = 0.00
      this.organizeTotal = 0.00
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style scoped>
.add-evaluate-container {
  height: calc(100vh - 46px);
}
.add-evaluate-main {
  height: calc(100vh - 90px);
}
.add-evaluate-header {
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
  width: 20%;
  float: left;
  text-align: center;
  font-size: 14px;
  padding-top: 10px;
}
.detail-form {
  width: 60%;
  float: left;
}
.detail-form-item {
  margin: 0px;
  height: 30px;
}
.detail-div {
  margin-top: 10px;
  border: 1px solid rgb(210,226,255);
  height: 85px;
  padding: 3px 0px 0px 5px;
}
.left-span {
  display: inline-block;
  width: 80px;
}
.right-span {
  display: inline-block;
  width: 80px;
}
.left-content {
  display: inline-block;
  width: 150px;
}
.course-form-item {
  width: 100%;
  float: left;
  vertical-align: middle;
  margin-bottom: 0px;
}
.course-form-span {
  float: left;
  width: 170px;
  margin-right: 20px;
}
.course-form-rate {
  width: 370px;
  margin-top: 10px;
}
.course-div {
  height: 190px;
  margin-top: 5px;
  border: 1px solid rgb(210,226,255);
  padding: 3px 0px 0px 5px;
}
.organize-div {
  height: 150px;
  margin-top: 5px;
  border: 1px solid rgb(210,226,255);
  padding: 3px 0px 0px 5px;
}
.course-form-item-left {
  width: 50%;
  float: left;
}
.course-form-score {
  margin-left: 5px;
  color: rgb(101, 130, 214);
}
.course-total-span {
  float: right;
  margin-right: 20px;
}
.course-total-score {
  margin-left: 2px;
  margin-right: 3px;
  color: rgb(101, 130, 214);
}
.course-input {
  width: calc(100vh - 140px);
}
.course-advise-span {
  display: inline-block;
  width: 180px;
}
.commit-button {
  padding-top: 7px;
  text-align: center;
}
.alert-text-div {
  /* background-color: thistle; */
  margin-top: 20px;
  height: 150px;
  border: 1px solid rgb(210,226,255);
  padding: 10px 0px 10px 20px;
  color: rgb(74, 70, 138);
  /* text-align: start; */
  /* text-align: center; */
  /* vertical-align: middle; */
}
.alert-text-span {
  margin-left: 10px;
  /* background-color: tomato; */
  /* display: inline-block; */
  /* margin-bottom: 50px; */
  /* text-align: start; */
  /* margin-bottom: 55px; */
}
</style>
<style>
.el-rate {
  vertical-align: middle;
}
.detail-form-item .el-form-item__content {
  line-height: 30px;
}
</style>