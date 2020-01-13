const Base = require('./base');
const UUID = require('node-uuid')
module.exports = class extends Base {
  async getUserInfoAction() {
    try {
      let user = await this.model('user').where({u_username: this.user.u_username}).find(); // 获取当前用户的信息
      let d_name = await this.model('department').where({ d_id: user.d_id }).getField('d_name') // 获取部门名称
      let r_id = JSON.parse(this.user.r_id)
      let rname = []
      for (let i=0; i<r_id.length; i++) {
        let data = await this.model('role').where({ r_id: r_id[i] }).find() // 获取角色名称
        rname.push(data.r_name)
      }
      let r_name = ''
      for (let i=0; i<rname.length; i++) {
        if (i === 0) {
          r_name = rname[i]
        } else {
          r_name = r_name + ',' + rname[i]
        }
      }
      let result = []
      result.push({
        u_name: user.u_name,
        u_username: user.u_username,
        d_name: d_name[0],
        r_name: r_name,
        u_education: user.u_education,
        u_email: user.u_email,
        u_sex: user.u_sex,
        u_id: user.u_id
      })
      return this.success(result);
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
