const Base = require('./base')
const UUID = require('node-uuid')
module.exports = class extends Base {
  async getArrangeListAction() {
    try {
      let list1 = await this.model('course').where({c_status: '2'}).select()
      console.log(list1);
      
      let result = []
      for (let i=0; i<list1.length; i++) {
        let c_id = list1[i].c_id
        let list2 = await this.model('arrange').where({c_id: c_id}).find()
        result.push({
          c_id: c_id,
          c_name: list1[i].c_name,
          c_category: list1[i].c_category,
          c_hour: list1[i].c_hour,
          d_name: list1[i].d_name,
          l_name: list1[i].l_name,
          a_id: list2.a_id,
          a_time: list2.a_time,
          a_place: list2.a_place,
          a_lecturer: list2.a_lecturer,
          a_number: list2.a_number,
          a_stu: list2.a_stu,
          a_max_number: list2.a_max_number
        })
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取课程安排表失败')
    }
  }
  async addDetailAction() {
    let a_id = UUID.v1()
    let c_id = this.post('c_id')
    let a_time = this.post('time')
    let a_place = this.post('place')
    let a_lecturer = this.post('lecturer')
    let a_max_number = this.post('max_number')
    try {
      let result = await this.model('arrange').add({a_id, a_time, a_place, a_lecturer, c_id, a_max_number})
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('添加课程详情失败')
    }
  }
  async updateDetailAction() {
    let a_id = this.post('id')
    let a_time = this.post('time')
    let a_place = this.post('place')
    let a_lecturer = this.post('lecturer')
    let a_max_number = this.post('max_number')
    try {
      let result = this.model('arrange').where({a_id}).update({a_time: a_time, a_lecturer: a_lecturer, a_place: a_place, a_max_number})
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('修改课程详情失败')
    }
  }
  async addStuAction() {
    let a_id = this.post('a_id')
    let a_stu = this.post('a_stu')
    let a_number = this.post('a_number')
    try {
      let result = await this.model('arrange').where({a_id}).update({a_stu: a_stu, a_number:a_number})
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('添加参与人员失败')
    }
  }
  async getStuInfoAction() {
    let list = JSON.parse(this.post('list'))
    try {
      let result = []
      for (let i=0; i<list.length; i++) {
        let stulist = await this.model('info').where({i_id: list[i]}).find()
        result.push(stulist)
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取人员详情失败')
    }
  }
  async applyToCourseAction() {
    let a_id = this.post('a_id')
    let a_stu = this.post('a_stu')
    let a_number = this.post('a_number')
    try {
      let result = await this.model('arrange').where({a_id: a_id}).update({ a_stu, a_number })
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('加入课程失败')
    }
  }
}