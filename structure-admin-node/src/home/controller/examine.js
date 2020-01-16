const Base = require('./base')
module.exports = class extends Base {
  // 获取讲师的课程列表
  async getMyCourseAction() {
    try {
      let u_id = this.user.u_id
      let course = await this.model('course').where({ c_lecturer_id: u_id, c_status: '2' }).select()
      return this.success(course)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取课程列表失败')
    }
  }
  // 获取课程的学生
  async getCourseStuAction() {
    let c_id = this.post('c_id')
    try {
      let stu = await this.model('course').where({ c_id: c_id }).getField('c_stu') // 在课程安排表找到参加课程的学生
      let stuList = JSON.parse(stu) // 参加课程的学生id转换成数组
      let result = []
      for (let i = 0; i < stuList.length; i++) {
        let info = await this.model('user').where({ u_id: stuList[i] }).find()
        let dname = await this.model('department').where({ d_id: info.d_id }).find()
        let grade = await this.model('performance').where({ c_id: c_id, i_id: stuList[i] }).find()
        if (think.isEmpty(grade)) {
          result.push({
            u_id: info.u_id,
            u_name: info.u_name,
            d_id: info.d_id,
            d_name: dname.d_name
          })
        } else {
          result.push({
            u_id: info.u_id,
            u_name: info.u_name,
            d_id: info.d_id,
            d_name: dname.d_name,
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
  // 添加学生成绩
  async editStuGeadeAction() {
    let u_id = this.post('u_id')
    let c_id = this.post('c_id')
    let p_grade = this.post('p_grade')
    let p_evaluate = this.post('p_evaluate')
    let p_pass = this.post('p_pass')
    let enthusiasm = this.post('enthusiasm')
    let answer = this.post('answer')
    let examine = this.post('examine')
    try {
      let check = await this.model('performance').where({ i_id: u_id, c_id:c_id }).find()
      if (think.isEmpty(check)) {
        let add = await this.model('performance').add({ i_id: u_id, c_id, p_grade, p_pass, p_evaluate, enthusiasm, answer, examine })
        console.log('add');
        console.log(add);
      } else {
        let update = await this.model('performance').where({ i_id: u_id, c_id: c_id }).update({ p_grade, p_pass, p_evaluate, enthusiasm, answer, examine })
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
}