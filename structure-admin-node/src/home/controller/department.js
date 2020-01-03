const Base = require('./base')
const UUID = require('node-uuid')

module.exports = class extends Base {
  async addDepartmentAction() {
    let d_id = UUID.v1()
    let d_name = this.post('name')
    let d_manager = this.post('manager')
    try {
      let add = await this.model('department').add({d_id, d_name, d_manager})
      return this.success(add)
    }
    catch(e) {
      console.log(e);
      return this.fail('添加部门失败')
    }
  }
  async getDepartmentListAction() {
    try {
      let list = await this.model('department').select()
      return this.success(list)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取部门列表失败')
    }
  }
  async getStuListAction() {
    let d_id = this.post('d_id')
    try {
      let data = await this.model('info').where({d_id}).select()
      console.log(data);
      return this.success(data)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取部门内的员工数据失败')
    }
    
  }
}