const Base = require('./base');
const UUID = require('node-uuid')

module.exports = class extends Base {
  async applyCourseAction () {
    let { c_name, c_category, c_hour, d_id } = this.post()
    let c_id = UUID.v1()
    let c_status = '1'
    let c_opinion = ''
    try {
      let check = await this.model('course').where({ c_name }).find()
      if (think.isEmpty(check)) {
        let  result = await this.model('course').add({ c_id, c_name, c_category, c_hour, d_id, c_status, c_opinion, u_id: this.user.u_id })
        return this.success(result)
      } else {
        return this.fail('"'+c_name+'"已经存在，请检查课程名称')
      }
    }
    catch(e) {
      console.log(e);
      return this.fail('申请课程失败')
    }
  }
  // 获取课程申请列表
  async getCourseListAction() {
    let c_status = this.post('c_status')
    try {
      let course = []
      if (c_status === '' || c_status === null || c_status === undefined) {
        course = await this.model('course').select()
      } else {
        course = await this.model('course').where({ c_status }).select()
      }
      let result = []
      for (let i=0; i<course.length; i++) {
        let dname = await this.model('department').where({ d_id: course[i].d_id }).find()
        let uname = await this.model('user').where({ u_id: course[i].u_id }).find()
        result.push({
          c_id: course[i].c_id,
          c_name: course[i].c_name,
          c_category: course[i].c_category,
          c_hour: course[i].c_hour,
          c_status: course[i].c_status,
          c_opinion: course[i].c_opinion,
          d_name: dname.d_name,
          u_name: uname.u_name,
          d_id: course[i].d_id,
          u_id: course[i].u_id
        })
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail(e)
    }
  }
  async updateCourseAction() {
    let { c_id, c_name, c_category, c_hour, d_id } = this.post()

    let c_status = '1'
    let c_opinion = '*重新申请'
    try {
      let res = await this.model('course').where({ c_id }).update({ c_name, c_category, d_id, c_hour, c_status, c_opinion })
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