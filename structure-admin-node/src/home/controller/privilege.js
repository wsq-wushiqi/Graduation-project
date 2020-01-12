const Base = require('./base')
module.exports = class extends Base {
  async getStuInfoListAction() {
    try {
      let result = await this.model('info').select()
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取用户列表失败')
    }
  }
  async getLecturerListAction() {
    try {
      let result = await this.model('lecture').select()
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取用户列表失败')
    }
  }
  async getManageListAction() {
    try {
      let result = await this.model('manage').select()
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取用户列表失败')
    }
  }
  async addUserAccountAction() {
    let name = this.post('name')
    let u_username = this.post('username')
    const salt = 'structure'
    let u_password = think.md5(salt + '123456')
    let u_role_id = this.post('role_id')
    try {
      console.log(u_role_id);
      
    }
    catch(e) {
      console.log(e);
      return this.fail('添加用户失败')
    }
  }
}