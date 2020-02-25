<template>
  <div class="write-weekly">
    <p>今天：{{currentDate}}&nbsp;&nbsp;{{ time }}</p>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="weeklyContent">
    </el-input>
    <p>
      <el-button type="primary" plain @click="submitWeekly">提交内容</el-button>
    </p>
    <el-input v-model="testData"/><el-button @click="ok"></el-button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data(){
      return {
        weeklyContent: '',
        currentDate: new Date().toLocaleDateString(),
        time: new Date().getHours()+":"+new Date().getSeconds(),
        testData: ''
      }
    },
    methods: {
      ...mapActions([
        // "getUserInfo",
        "addWeekly",
        "test"
      ]),
      submitWeekly(){
        var params = {
          content: this.weeklyContent,
          date: this.currentDate
        }
        this.addWeekly(params).then(res => {
          if(res.errno == 0 ){
            this.$message.success(res.errmsg|| '提交成功');
          }else{
            this.$message.error(res.errmsg|| '服务开小差');
          }
        })
      },
      ok: function() {
        let params = {
        //   date: this.currentDate
        }
        this.test().then(res => {
          console.log(res);
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
.write-weekly{

}
</style>
