const Base = require('./base');
module.exports = class extends Base {
  async getUserInfoAction() {
    let username = this.post('username')
    try {
      let user = await this.model('user').where({u_username: username}).find(); // 拿输入的用户名去数据库查询
      let userId = user.u_id
      let userInfo = await this.model('info').where({i_id: userId}).find()
      return this.success(userInfo);
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
      let user = await this.model('user').where({u_id:u_id}).find()
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
}
