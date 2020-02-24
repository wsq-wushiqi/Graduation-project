const Base = require('./base')
module.exports = class extends Base {
  // 获取学生的个人培训计划
  async getStuPlanListAction() {
    let state = this.get('state')
    console.log(state);
    
    let data = []
    try {
      let stu = await this.model('course').select()
      for (let i = 0; i < stu.length; i++) {
        if (stu[i].c_stu !== '' && stu[i].c_stu !== null) {
          let stuid = JSON.parse(stu[i].c_stu)
          for (let j = 0; j < stuid.length; j++) {
            if (stuid[j] === this.user.u_id) {
              let lecturer = await this.model('user').where({ u_id: stu[i].c_lecturer_id }).find()
              // data.push({
              //   c_name: stu[i].c_name,
              //   c_id: stu[i].c_id,
              //   c_category: stu[i].c_category,
              //   c_date: stu[i].c_date,
              //   c_hour: stu[i].c_hour,
              //   c_place: stu[i].c_place,
              //   c_lecturer_id: stu[i].c_lecturer_id,
              //   c_lecturer_name: lecturer.u_name,
              // })
              // console.log(stu[i].c_date);
                            
              console.log(Date.parse(stu[i].c_date));
              console.log(Date.parse(new Date()));
              if (state === '00' ) {
                if (Date.parse(stu[i].c_date) > Date.parse(new Date())) {
                  let date = stu[i].c_date.substring(0,10) + ' ' + stu[i].c_date.substring(11, 20)
                  data.push({
                    c_name: stu[i].c_name,
                    c_id: stu[i].c_id,
                    c_category: stu[i].c_category,
                    c_date: date,
                    c_hour: stu[i].c_hour,
                    c_place: stu[i].c_place,
                    c_lecturer_id: stu[i].c_lecturer_id,
                    c_lecturer_name: lecturer.u_name,
                  })
                }
              } else if (state === '02') {
                if (Date.parse(stu[i].c_date) < Date.parse(new Date())) {
                  let date = stu[i].c_date.substring(0,10) + ' ' + stu[i].c_date.substring(11, 20)
                  data.push({
                    c_name: stu[i].c_name,
                    c_id: stu[i].c_id,
                    c_category: stu[i].c_category,
                    c_date: date,
                    c_hour: stu[i].c_hour,
                    c_place: stu[i].c_place,
                    c_lecturer_id: stu[i].c_lecturer_id,
                    c_lecturer_name: lecturer.u_name,
                  })
                }
              }
            }
          }
        }
      }
      return this.success(data)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取个人培训计划列表失败')
    }
  }
}