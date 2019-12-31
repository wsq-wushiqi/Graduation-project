<template>
  <div class="lecture-info-container">
    <el-container>
      <el-header class="query-header" height="50px">
        <span class="query-span">部门：</span><el-input v-model="queryDepartment" class="query-input" size="mini" clearable @clear="query"></el-input>
        <span class="query-span">姓名：</span><el-input v-model="queryName" class="query-input" size="mini" clearable @clear="query"></el-input>
        <el-button @click="query" size="mini">查询</el-button>
      </el-header>
      <el-container>
        <el-header class="operation-header" height="45px">
          <el-button size="mini" @click="add">录入</el-button>
        </el-header>
        <el-main>Main
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="addDlgVisible" title="录入信息" width="400px">
      <el-form :model="addForm">
        <el-form-item>
          <span class="add-form-sapn">姓名：</span>
          <el-input v-model="addForm.l_name" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-sapn">性别：</span>
          <el-input v-model="addForm.l_sex" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-sapn">部门：</span>
          <el-input v-model="addForm.l_department" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-sapn">学历：</span>
          <el-input v-model="addForm.l_education" class="add-form-input"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <span class="add-form-sapn">评分：</span>
          <el-input v-model="addForm.l_grade"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer">
        <el-button @click="addDlgVisible = false">取消</el-button>
        <el-button>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryDepartment: '',
      queryName: '',
      addDlgVisible: false,
      addForm: {
        l_name: '',
        l_sex: '',
        l_department: '',
        l_education: '',
        l_grade: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    query: function() {
      this.$message.success('查询')
    },
    add: function() {
      this.addDlgVisible = true
    }
  }
}
</script>

<style scoped>
.lecture-info-container {
  height: calc(100vh - 46px);
}
.query-header {
  /* background-color: cadetblue; */
  line-height: 50px;
}
.query-span {
  /* background-color: coral; */
  display: inline-block;
  width: 65px;
  line-height: 30px;
}
.query-input {
  width: 150px;
  margin-right: 20px;
}
.operation-header {
  /* background-color: burlywood; */
  line-height: 45px;
  border-bottom: 1px solid rgb(210,226,255);
}
.add-form-sapn {
  /* background-color: rgb(180, 141, 206); */
  display: inline-block;
  width: 18%;
  text-align: right;
}
.add-form-input {
  width: 60%;
  margin-left: 5px;
}
</style>