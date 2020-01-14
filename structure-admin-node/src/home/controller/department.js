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
  // 获取部门内的普通员工
  async getStuListAction() {
    let d_id = this.post('d_id')
    try {
      let result = []
      let data = await this.model('user').where({ d_id }).select()
      for (let i=0; i<data.length; i++) {
        // console.log(data[i].r_id);
        // if (data[i].r_id !== '' && data[i].r_id !== null) {
          let rid = JSON.parse(data[i].r_id)
          for (let j=0; j<rid.length; j++) {
            if (rid[j] === '98d6a6f0-35d2-11ea-b6ad-4beebee6d9ee') {
              result.push(data[i])
            }
          }
        // }
        
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取部门内的员工数据失败')
    }
    
  }
}