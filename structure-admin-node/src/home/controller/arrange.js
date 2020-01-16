const Base = require('./base')
module.exports = class extends Base {
  // 获取所有课程安排表
  async getArrangeListAction() {
    try {
      let c = await this.model('course').where({c_status: '2'}).select()
      let result = []
      for (let i=0; i<c.length; i++) {
        let u = await this.model('user').where({ u_id: c[i].u_id }).find()
        result.push({
          c_id: c[i].c_id,
          c_name: c[i].c_name,
          c_date: c[i].c_date,
          c_place: c[i].c_place,
          c_number: c[i].c_number,
          c_max_number: c[i].c_max_number,
          c_lecturer_id: c[i].c_lecturer_id,
          c_stu: c[i].c_stu,
          u_name: u.u_name
        })
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取课程安排表失败')
    }
  }
  // 添加课程详情
  async addDetailAction() {
    let { c_id, c_date, c_lecturer_id, c_max_number, c_place } = this.post()
    try {
      let result = await this.model('course').where({ c_id }).update({ c_date, c_place, c_lecturer_id, c_max_number })
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('添加课程详情失败')
    }
  }
  // 添加培训人员
  async addStuAction() {
    let c_id = this.post('c_id')
    let c_stu = this.post('c_stu')
    let c_number = this.post('c_number')
    try {
      let result = await this.model('course').where({ c_id }).update({ c_stu: c_stu, c_number: c_number })
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('添加参与人员失败')
    }
  }
  // 获取参加培训员工的信息
  async getStuInfoAction() {
    let list = JSON.parse(this.post('list'))
    try {
      let result = []
      for (let i = 0; i < list.length; i++) {
        let stulist = await this.model('user').where({ u_id: list[i] }).find()
        result.push(stulist)
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取人员详情失败')
    }
  }
  // 申请加入课程
  async applyToCourseAction() {
    let c_id = this.post('c_id')
    let c_stu = this.post('c_stu')
    let c_number = this.post('c_number')
    try {
      let result = await this.model('course').where({ c_id: c_id }).update({ c_stu, c_number })
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('加入课程失败')
    }
  }
  // 获取个人课程安排
  async getMyCourseArrangeAction() {
    try {
      let c = await this.model('course').where({ c_status: '2', _complex: { u_id: this.user.u_id, c_lecturer_id: this.user.u_id, _logic: 'OR'} }).select()
      let result = []
      for (let i=0; i<c.length; i++) {
        let u = await this.model('user').where({ u_id: c[i].u_id }).find()
        result.push({
          c_id: c[i].c_id,
          c_name: c[i].c_name,
          c_date: c[i].c_date,
          c_place: c[i].c_place,
          c_number: c[i].c_number,
          c_max_number: c[i].c_max_number,
          c_lecturer_id: c[i].c_lecturer_id,
          c_stu: c[i].c_stu,
          u_name: u.u_name
        })
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取课程安排表失败')
    }
  }
}