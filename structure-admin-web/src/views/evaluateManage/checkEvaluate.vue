<template>
  <div class="check-evaluate-container">
    <el-container>
      <el-header height="45px" class="check-evaluate-header">Header</el-header>
      <el-main class="check-evaluate-main">
        <el-tabs type="border-card">
          <el-tab-pane label="课程评价" class="course-tab-pane">课程评价</el-tab-pane>
          <el-tab-pane label="教师评价" class="course-tab-pane">教师评价</el-tab-pane>
          <el-tab-pane label="其他评价" class="course-tab-pane">其他评价</el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {

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