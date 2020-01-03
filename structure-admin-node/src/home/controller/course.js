const Base = require('./base');
const UUID = require('node-uuid')

module.exports = class extends Base {
  async applyCourseAction () {
    let c_name = this.post('name')
    let c_category = this.post('category')
    let c_hour = this.post('hour')
    let d_id = this.post('department')
    let c_id = UUID.v1()
    let c_status = '1'
    let c_opinion = ''
    try {
      let department = await this.model('department').where({d_id}).find()
      let name = await this.model('lecture').where({ u_username: this.user.u_username}).find()
      let l_name = name.l_name
      let apply = await this.model('course').add({ c_id, c_name,u_username: this.user.u_username, c_category, c_hour, d_id, c_status, l_name, c_opinion, d_name: department.d_name})
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
    let d_name = this.post('department')
    let c_status = '1'
    let c_opinion = '*重新申请'
    try {
      let res = await this.model('course').where({ c_id }).update({ c_name, c_category, d_name, c_hour, c_status, c_opinion })
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
      let result = await this.model('course').where({c_id: id}).delete();
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('撤销失败')
    }
  }
  async examineAction() {
    let id = this.post('id')
    let c_status = this.post('status')
    let c_opinion = this.post('opinion')
    try {
      let result = await this.model('course').where({c_id: id}).update({c_status: c_status, c_opinion: c_opinion})
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('审核失败')
    }
  }
}