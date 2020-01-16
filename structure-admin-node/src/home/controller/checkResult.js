const Base = require('./base')
module.exports = class extends Base {
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
}