const Base = require('./base');
const UUID = require('node-uuid')

module.exports = class extends Base {
  async applyCourseAction () {
    let c_name = this.post('name')
    let c_category = this.post('category')
    let c_hour = this.post('hour')
    let c_department = this.post('department')
    let c_id = UUID.v1()
    let c_status = '1'
    try {
      let name = await this.model('lecture').where({ u_username: this.user.u_username}).find()
      let l_name = name.l_name
      let apply = await this.model('course').add({ c_id, c_name, c_category, c_hour, c_department, c_status, l_name})
      return this.success(apply)
    }
    catch(e) {
      console.log(e);
      return this.fail(e)
    }
  }
  async getCourseListAction() {
    try {
      let data = await this.model('course').select()
      return this.success(data)
    }
    catch(e) {
      console.log(e);
      return this.fail(e)
    }
  }
  async updateCourseAction() {
    let c_id = this.post('id')
    let c_name = this.post('name')
    let c_category = this.post('category')
    let c_hour = this.post('hour')
    let c_department = this.post('department')
    try {
      let res = await this.model('course').where({ c_id }).update({ c_name, c_category, c_department, c_hour })
      return this.success(res)
    }
    catch(e) {
      console.log(e);
      return this.fail('修改课程申请失败')
    }
  }
  async cancelApplyAction() {
    let id = this.post('id')
    try {

    }
    catch(e) {
      console.log(e);
      
    }
  }
}