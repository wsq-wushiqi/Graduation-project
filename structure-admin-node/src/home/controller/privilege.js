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
}