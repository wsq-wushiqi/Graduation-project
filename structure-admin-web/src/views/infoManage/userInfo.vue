<template>
  <div class="userinfo-container">
    <el-container>
      <el-header class="userinfo-header">
        <span class="header-span">个人资料</span>
        <div class="header-border"></div>
      </el-header>
      <el-main>
        <div class="info-img">
          <img height="80px" align="center" src="../../image/头像 女孩.png" alt="头像">
          <el-button class="info-button" size="small" icon="el-icon-check" type="primary" plain @click="change">修改密码</el-button>
        </div>
        <div class="info-div">
          <el-form>
            <el-form-item>
              <span>用户名：</span><span>{{ userForm.u_username }}</span>
            </el-form-item>
            <el-form-item>
              <span>姓名：</span><span>{{ userForm.i_name}}</span>
            </el-form-item>
            <el-form-item>
              <span>性别：</span><span>{{ userForm.i_sex }}</span>
            </el-form-item>
            <el-form-item>
              <span>部门：</span><span>{{ userForm.i_department }}</span>
            </el-form-item>
            <!-- <el-form-item>
              <span>职位：</span>
            </el-form-item> -->
            <!-- <el-form-item>
              <span>电话：</span>
            </el-form-item> -->
            <el-form-item>
              <span>邮箱：</span><span>{{ userForm.i_email }}</span>
            </el-form-item>
          </el-form>
        </div>
        
      </el-main>
    </el-container>
    <el-dialog :visible.sync="changeDlgVisible" title="修改密码">
      <span>{{ userInfo.u_username }}</span>
      <el-form :model="changeForm" ref="changeForm" :rules="formRule">
        <el-form-item prop="oldPwd">
          <span>原密码：</span><el-input v-model="changeForm.oldPwd"></el-input>
        </el-form-item>
        <el-form-item prop="newPwd">
          <span>新密码：</span><el-input v-model="changeForm.newPwd"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPwd">
          <span>确认密码：</span><el-input v-model="changeForm.confirmPwd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="changeDlgVisible = false">取消</el-button>
        <el-button @click="doChange">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    const newPwdValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('*请输入新密码'))
      } else if (value.length < 6) {
        callback(new Error('*密码不得少于6位'))
      } else if (value.length > 10) {
        callback(new Error('*密码不得大于11位'))
      }
    }
    const confirmPwdValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('*请输入确认密码'))
      } else if (value !== this.changeForm.newPwd) {
        callback(new Error('*两次输入的密码不一致'))
      }
    }
    return {
      userForm: {
        i_age: '',
        i_department: '',
        i_email: '',
        i_name: '',
        i_sex: '',
        u_username: ''
      },
      changeDlgVisible: false,
      changeForm: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      formRule: {
        oldPwd: [{ required: true, message: '*请输入原密码', trigger: 'blur'}],
        newPwd: [{ validator: newPwdValidate, trigger: 'blur'}],
        confirmPwd: [{ validator: confirmPwdValidate, trigger: 'blur'}]
      }
    }
  },
  mounted() {
    const params = {
      username: this.userInfo.u_username
    }
    this.myUserInfo(params).then(res => {
      if (res.errno === 0) {
        this.userForm = res.data
      }
    })
  },
  methods: {
    ...mapActions([
      'myUserInfo',
      'changePwd'
    ]),
    change:function() {
      this.changeDlgVisible = true
    },
    doChange: function() {
      let params = {
        id: this.userForm.i_id,
        oldPwd: this.changeForm.oldPwd,
        newPwd: this.changeForm.confirmPwd
      }
      this.changePwd(params).then(res => {
        if (res.errno === 0) {
          this.$message.success('修改成功')
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
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
.userinfo-container {
  height: calc(100vh - 46px);
}
.header-span {
  /* background-color: coral; */
  display: inline-block;
  height: 43px;
  font-size: 27px;
  margin: 10px;
  /* width: 90%; */
  text-align: center;

  /* border-bottom: 1px solid rgb(210,226,255); */
}
.header-border {
  /* background-color: darkcyan; */
  width: 90%;
  height: 10px;
  margin: 0px;
  /* text-align: center; */
  /* margin-left: 5%; */
  margin-left: 10px;
  border-top: 1px solid rgb(227, 230, 236);
}
.info-div {
  /* background-color: burlywood; */
  width: 450px;
  float: left;
  margin-top: 40px;
}
.info-img {
  /* display: inline-block; */
  width: 130px;
  float: left;
  padding: 10px;
}
.info-button {
  margin-top: 20px;
  padding: 5px 10px;
  /* text-align: center; */
}
</style>