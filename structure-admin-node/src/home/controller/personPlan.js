const Base = require('./base')
module.exports = class extends Base {
  async getPlanListAction() {
    let data = []
    try {
      let i_id = await this.model('info').where({u_username: this.user.u_username}).getField('i_id')
      let stu = await this.model('arrange').select()
      let iid = i_id[0]
      for (let i = 0; i < stu.length; i++) {
        let stuid = JSON.parse(stu[i].a_stu)
        if (stuid !== null) {
          for (let j = 0; j < stuid.length; j++) {
            if (stuid[j] === iid) {
              data.push(stu[i])
            }
          }
        }
      }
      let result = []
      for (let k = 0; k < data.length; k++) {
        let course = await this.model('course').where({c_id: data[k].c_id}).find()
        result.push({
          c_id: course.c_id,
          l_id: course.l_id,
          c_name: course.c_name,
          c_category: course.c_category,
          c_hour: course.c_hour,
          a_lecturer: data[k].a_lecturer,
          a_number: data[k].a_number,
          a_max_number: data[k].a_max_number,
          a_place: data[k].a_place,
          a_time: data[k].a_time
        })
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取个人培训计划列表失败')
    }
  }
}