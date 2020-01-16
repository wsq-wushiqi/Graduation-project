const Base = require('./base')
module.exports = class extends Base {
  // 获取个人成绩表
  async getMyCheckResultAction() {
    try {
      let result = []
      let data = await this.model('performance').where({ i_id: this.user.u_id }).select()
      for (let i = 0; i < data.length; i++) {
        let c = await this.model('course').where({ c_id: data[i].c_id }).find()
        let l = await this.model('user').where({ u_id: c.c_lecturer_id }).getField('u_name')
        result.push({
          c_id: data[i].c_id,
          c_name: c.c_name,
          c_lecturer_name: l[0],
          c_date: c.c_date,
          c_hour: c.c_hour,
          enthusiasm: data[i].enthusiasm,
          answer: data[i].answer,
          examine: data[i].examine,
          p_grade: data[i].p_grade,
          p_pass: data[i].p_pass
        })
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取成绩表失败')
    }
  }
  // 获取所有学生成绩
  async getAllCheckResultAction() {
    try {
      let result = []
      let r = await this.model('performance').select()
      for (let i = 0; i < r.length; i++) {
        let u = await this.model('user').where({ u_id: r[i].i_id }).find()
        let c = await this.model('course').where({ c_id: r[i].c_id }).find()
        let d = await this.model('department').where({ d_id: u.d_id }).getField('d_name')
        let l = await this.model('user').where({ u_id: c.c_lecturer_id }).getField('u_name')
        result.push({
          u_name: u.u_name,
          u_id: r[i].i_id,
          d_name: d[0],
          d_id: u.d_id,
          c_id: r[i].c_id,
          c_name: c.c_name,
          c_hour: c.c_hour,
          c_date: c.c_date,
          c_lecturer_id: c.c_lecturer_id,
          c_lecturer_name: l[0],
          enthusiasm: r[i].enthusiasm,
          answer: r[i].answer,
          examine: r[i].examine,
          p_grade: r[i].p_grade,
          p_pass: r[i].p_pass
        })
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取成绩表失败')
    }
  }
}