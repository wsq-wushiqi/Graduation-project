const Base = require('./base')
module.exports = class extends Base {
  async getMyCourseAction() {
    try {
      let u_username = this.user.u_username
      let course = await this.model('course').where({ u_username: u_username, c_status: '2' }).select()
      return this.success(course)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取课程列表失败')
    }
  }
  async getCourseStuAction() {
    let c_id = this.post('c_id')
    try {
      let stu = await this.model('arrange').where({ c_id: c_id }).getField('a_stu') // 在课程安排表找到参加课程的学生
      let stuList = JSON.parse(stu) // 参加课程的学生id转换成数组
      let result = []
      for (let i=0; i<stuList.length; i++) {
        let info = await this.model('info').where({ i_id: stuList[i] }).find()
        let grade = await this.model('performance').where({ c_id: c_id, i_id: stuList[i] }).find()
        if (think.isEmpty(grade)) {
          result.push(info)
        } else {
          result.push({
            i_id: info.i_id,
            i_name: info.i_name,
            d_id: info.d_id,
            d_name: info.d_name,
            p_grade: grade.p_grade,
            p_evaluate: grade.p_evaluate,
            p_pass: grade.p_pass,
            enthusiasm: grade.enthusiasm,
            answer: grade.answer,
            examine: grade.examine
          })
        }
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取学生列表失败')
    }
  }
  async editStuGeadeAction() {
    let i_id = this.post('i_id')
    let c_id = this.post('c_id')
    let p_grade = this.post('p_grade')
    let p_evaluate = this.post('p_evaluate')
    let p_pass = this.post('p_pass')
    let enthusiasm = this.post('enthusiasm')
    let answer = this.post('answer')
    let examine = this.post('examine')
    try {
      let check = await this.model('performance').where({ i_id: i_id, c_id:c_id }).find()
      if (think.isEmpty(check)) {
        let add = await this.model('performance').add({ i_id, c_id, p_grade, p_pass, p_evaluate, enthusiasm, answer, examine })
        console.log('add');
        console.log(add);
      } else {
        let update = await this.model('performance').where({ i_id: i_id, c_id: c_id }).update({ p_grade, p_pass, p_evaluate, enthusiasm, answer, examine })
        console.log('update'+update);
        console.log(update);
      }
      return this.success()
    }
    catch(e) {
      console.log(e);
      return this.fail('编辑成绩出错')
    }
  }
  async getCheckResultAction() {
    try {
      let info = await this.model('info').where({ u_username: this.user.u_username}).find()
      let grade = await this.model('performance').where({ i_id: info.i_id }).select()
      let result = []
      for (let i=0; i<grade.length; i++) {
        let course = await this.model('course').where({ c_id: grade[i].c_id }).find()
        let arrange = await this.model('arrange').where({ c_id: grade[i].c_id }).find()
        result.push({
          c_name: course.c_name,
          c_hour: course.c_hour,
          a_time: arrange.a_time,
          a_lecturer: arrange.a_lecturer,
          enthusiasm: grade[i].enthusiasm,
          answer: grade[i].answer,
          examine: grade[i].examine,
          p_grade: grade[i].p_grade,
          p_pass: grade[i].p_pass
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