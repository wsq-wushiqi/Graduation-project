const Base = require('./base');
const UUID = require('node-uuid')
module.exports = class extends Base {
  async getUserInfoAction() {
    let username = this.post('username')
    try {
      let user = await this.model('user').where({u_username: username}).find(); // 拿输入的用户名去数据库查询
      return this.success(user);
    }
    catch(e) {
      console.log(e);
      return this.fail("获取用户信息失败")
    }
  }
  async changePwdAction() {
    let u_id = this.post('id')
    let oldPwd = this.post('oldPwd')
    let newPwd = this.post('newPwd')
    const salt = 'structure';
    oldPwd = think.md5(salt + oldPwd);
    let newPassword = think.md5(salt + newPwd)
    try {
      let user = []
      user = await this.model('user').where({u_id:u_id}).find()
      if (user.u_password !== oldPwd) {
        return this.fail('原密码不正确')
      } else {
        let change = await this.model('user').where({u_id: u_id}).update({u_password: newPassword})
        return this.success(change)
      }
    }
    catch(e) {
      console.log(e);
      return this.fail("修改失败")
    }
  }
  async resetPwdAction() {
    let u_id = this.post('id')
    const salt = 'structure';
    let password = think.md5(salt + '123456');
    try {
      let result = await this.model('user').where({ u_id: u_id}).update({u_password: password})
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('重置密码失败')
      
    }
  }
  async addUserAction() {
    let {u_name, u_username, u_education, u_sex, u_email, r_id, d_id} = this.post()
    let u_id = UUID.v1()
    const salt = 'structure'
    let u_password = think.md5(salt + '123456')
    try {
      let check = await this.model('user').where({ u_username }).find()
      if (think.isEmpty(check)) {
        let result = await this.model('user').add({u_id, u_username, u_password, r_id, d_id, u_name, u_email, u_sex, u_education})
        console.log(result)
        return this.success(result)
      } else {
        return this.fail('用户名已经存在')
      }
    }
    catch(e) {
      console.log(e);
      return this.fail('添加用户失败')
    }
  }
}
