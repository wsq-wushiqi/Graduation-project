const Base = require('./base');
const UUID = require('node-uuid')
module.exports = class extends Base {
  async addLectureInfoAction() {
    let l_name = this.post('name')
    let l_sex = this.post('sex')
    let l_department = this.post('department')
    let l_education = this.post('education')
    let l_id = UUID.v1()
    let u_username = this.post('username')
    let u_role = '教师'
    let u_role_id = '20'
    let u_id = l_id
    let u_password = think.md5('structure' + '123456');
    try {
      let data3 = await this.model('user').where({u_username: u_username}).select()
      if (think.isEmpty(data3)) {
        let add = await this.model('lecture').add({ l_id, l_name, l_sex, l_department, l_education, u_username });
        let useradd = await this.model('user').add({ u_id, u_username, u_password, u_role_id, u_role})
        return this.success(add);
      } else {
        return this.fail('用户名已经存在')
      }
    }
    catch(e) {
      console.log(e);
      return this.fail("添加教师信息失败")
    }
  }
  async getLectureListAction() {
    try {
      let getData = await this.model('lecture').select();
      return this.success(getData)
    }
    catch(e) {
      console.log(e);
      return this.fail(e)
    }
  }
  async updateLectureInfoAction() {
    let data = this.post()
    let id = data.l_id
    try {
      let list = await this.model('lecture').where({ l_id: id }).update(data)
      console.log(list);
      return this.success(list)
    }
    catch(e) {
      console.log(e);
      return this.fail(e)
    }
  }
  async deleteInfoAction() {
    let id = this.post('id')
    try {
      let result = await this.model('lecture').where({ l_id: id }).delete();
      let result1 = await this.model('user').where({ u_id: id }).delete();
      console.log(result);
      console.log(result1);
      return this.success('删除成功')
    }
    catch(e) {
      console.log(e);
      return this.fail(e)
    }
  }
  async queryLectureInfoAction() {
    let name = this.post('name');
    let department = this.post('department');
    try {
      let sql = {}
      if (name === '' && department === '') {
        sql = {}
      } else if (name !== '' && department === '') {
        sql = { l_name : ['like','%'+ name +'%'] }
      }  else if (name === '' && department !== '') {
        sql = { l_department: ['like','%'+ department +'%']}
      } else {
        sql = { l_name: ['like','%'+ name +'%'], l_department: ['like','%'+ department +'%']}
      }
      let res = await this.model('lecture').where(sql).select()
      return this.success(res);
    } catch(e) {
      console.log(e);
      return this.fail('服务器开小差')
    }
  }
}
