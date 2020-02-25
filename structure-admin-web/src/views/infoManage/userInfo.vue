<template>
  <div class="userinfo-container">
    <el-container>
      <el-header class="userinfo-header">
        <span class="header-span">个人资料</span>
        <div class="header-border"></div>
      </el-header>
      <el-main>
        <div class="info-img">
          <img v-if="userForm.u_sex === '女'" height="80px" align="center" src="../../image/头像 女孩.png" alt="头像">
          <img v-else height="80px" align="center" src="../../image/头像 男孩.png" alt="头像">
          <el-button class="info-button" size="small" icon="el-icon-fork-spoon" type="primary" plain @click="changeInfo">修改资料</el-button>
          <el-button class="pwd-button" size="small" icon="el-icon-lock" type="primary" plain @click="change">修改密码</el-button>
        </div>
        <div class="info-div">
          <el-form>
            <el-form-item>
              <span>用户名：</span><span>{{ userForm.u_username }}</span>
            </el-form-item>
            <el-form-item>
              <span>姓名：</span><span>{{ userForm.u_name}}</span>
            </el-form-item>
            <el-form-item>
              <span>性别：</span><span>{{ userForm.u_sex }}</span>
            </el-form-item>
            <el-form-item>
              <span>部门：</span><span>{{ userForm.d_name }}</span>
            </el-form-item>
            <el-form-item>
              <span>权限：</span><span>{{ userForm.r_name }}</span>
            </el-form-item>
            <el-form-item>
              <span>学历：</span><span>{{ userForm.u_education }}</span>
            </el-form-item>
            <el-form-item>
              <span>邮箱：</span><span>{{ userForm.u_email }}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="changeDlgVisible" title="修改密码" width="400px" class="changpwd-dialog" :close-on-click-modal="false">
      <span class="username-span">{{ userInfo.u_username }}</span>
      <el-form :model="changeForm" ref="changeForm" :rules="formRule">
        <el-form-item prop="oldPwd">
          <span class="pwd-span">原密码：</span><el-input v-model="changeForm.oldPwd" class="pwd-input"></el-input>
        </el-form-item>
        <el-form-item prop="newPwd">
          <span class="pwd-span">新密码：</span><el-input v-model="changeForm.newPwd" class="pwd-input"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPwd">
          <span class="pwd-span">确认密码：</span><el-input v-model="changeForm.confirmPwd" class="pwd-input"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="changeDlgVisible = false">取消</el-button>
        <el-button @click="doChange">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="changeInfoVisible" title="修改个人资料" width="400px" class="change-info-dialog" :close-on-click-modal="false">
      <el-form :data="infoForm">
        <el-form-item>
          <span class="change-info-span">用户名：</span>
          <el-input v-model="infoForm.u_username" disabled class="change-info-input"></el-input>
        </el-form-item>
        <el-form-item prop="u_name">
          <span class="change-info-span">姓名：</span>
          <el-input v-model="infoForm.u_name" class="change-info-input"></el-input>
        </el-form-item>
        <el-form-item prop="u_sex">
          <span class="change-info-span">性别：</span>
          <el-radio-group v-model="infoForm.u_sex">
            <el-radio v-for="(item, key) in sexList" :key="key" :label="item.label" :value="item.label"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="u_name">
          <span class="change-info-span">学历：</span>
          <el-input v-model="infoForm.u_education" class="change-info-input"></el-input>
        </el-form-item>
        <el-form-item prop="u_name">
          <span class="change-info-span">邮箱：</span>
          <el-input v-model="infoForm.u_email" class="change-info-input"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="changeInfoVisible = false">取消</el-button>
        <el-button @click="doChangeInfo">确定</el-button>
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
        d_name: '',
        r_name: '',
        u_education: '',
        u_email: '',
        u_id: '',
        u_name: '',
        u_sex: '',
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
      },
      infoForm: {
        u_name: '',
        u_username: '',
        u_sex: '',
        u_education: '',
        u_email: ''
      },
      changeInfoVisible: false,
      sexList: [{
        label: '男'
      }, {
        label: '女'
      }]
    }
  },
  mounted() {
    this.userInfoData()
  },
  methods: {
    ...mapActions([
      'myUserInfo',
      'changePwd', // 修改密码
      'updateMyInfo' // 修改个人资料
    ]),
    // 获取用户资料
    userInfoData: function() {
      this.myUserInfo().then(res => {
        if (res.errno === 0) {
          this.userForm = res.data[0]
        }
      })
    },
    // 打开修改密码对话框
    change:function() {
      this.changeDlgVisible = true
    },
    // 修改密码
    doChange: function() {
      let params = {}
      params = {
        id: this.userForm.u_id,
        oldPwd: this.changeForm.oldPwd,
        newPwd: this.changeForm.confirmPwd
      }
      this.changePwd(params).then(res => {
        if (res.errno === 0) {
          this.$message.success('修改成功')
          this.changeDlgVisible = false
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 打开修改个人资料对话框
    changeInfo: function() {
      this.changeInfoVisible = true
      this.infoForm = Object.assign({}, this.userForm)
    },
    // 修改个人资料
    doChangeInfo: function() {
      this.updateMyInfo(this.infoForm).then(res => {
        if (res.errno === 0) {
          this.changeInfoVisible = false
          this.$message.success('修改资料成功')
          this.userInfoData()
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
  display: inline-block;
  height: 43px;
  font-size: 27px;
  margin: 10px;
  text-align: center;
}
.header-border {
  width: 90%;
  height: 10px;
  margin: 0px;
  margin-left: 10px;
  border-top: 1px solid rgb(227, 230, 236);
}
.info-div {
  width: 450px;
  float: left;
  margin-top: 40px;
}
.info-img {
  width: 130px;
  height: 200px;
  float: left;
  padding: 10px;
}
.info-button {
  margin-top: 20px;
  padding: 5px 10px;
}
.pwd-button {
  padding: 5px 10px;
  margin-top: 15px;
  margin-left: 0px;
}
.change-info-span {
  display: inline-block;
  width: 60px;
}
.change-info-input {
  width: 200px;
}
.username-span {
  display: inline-block;
  margin-bottom: 12px;
  width: 100%;
  text-align: center;
  font-size: 23px;
}
.pwd-input {
  width: 60%;
}
.pwd-span {
  display: inline-block;
  text-align: right;
  width: 30%;
}
</style>
<style>
.change-info-dialog .el-dialog__body {
  padding: 10px 30px 2px 30px;
}
.change-info-dialog .el-dialog__footer {
  padding-top: 2px;
}
.changpwd-dialog .el-dialog__body {
  padding: 5px 30px 2px 30px;
}
</style>