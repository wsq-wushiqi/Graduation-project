'use strict'
const Base = require('./base');
const UUID = require('node-uuid')
module.exports = class extends Base {
  async infoListAction() {
    try {
      let res = await this.model('info').select()
      return this.success(res);
    } catch(e) {
      console.log(e);
      return this.fail('服务器开小差')
    }
  }
  async addInfoAction() {
    let d_id = this.get('department')
    let i_name = this.get('name')
    let i_sex = this.get('sex')
    let i_age = this.get('age')
    let i_email = this.get('email')
    let u_username = this.get('username')
    let u_role = '普通员工'
    let u_role_id = '10'
    let id = UUID.v1()
    let i_id = id
    let u_id = id
    let u_password = think.md5('structure' + '123456');
    try {
      let d_name = await this.model('department').where({d_id}).find()
      let data3 = await this.model('user').where({u_username: u_username}).select()
      if (think.isEmpty(data3)) {
        let data = await this.model('info').add({ i_id, d_id, i_name, u_username, i_sex, i_age, i_email, d_name: d_name.d_name });
        let data2 = await this.model('user').add({ u_id, u_username, u_password, u_role, u_role_id })
        console.log(data, data2);
        let res = await this.model('info').select()
        return this.success(res);
      } else {
        return this.fail('用户名已存在')
      }
    } catch(e) {
      console.log(e);
      return this.fail('服务器开小差')
    }
  }
  async delInfoAction() {
    let id = this.post('id');
    try {
      let data = await this.model('info').where({i_id: ['=', id]}).delete()
      let data1 = await this.model('user').where({u_id: ['=', id]}).delete()
      console.log(data, data1);
      let res = await this.model('info').select()
      return this.success(res);
    } catch(e) {
      console.log(e);
      return this.fail('服务器开小差')
    }
  }
  async updateInfoAction() {
    let id = this.post('id');
    let department = this.post('department');
    let name = this.post('name');
    let age = this.post('age');
    let sex = this.post('sex');
    let email = this.post('email');
    try {
      let d_name = await this.model('department').where({d_id: department}).find()
      let data = await this.model('info').where({i_id: id}).update({d_id: department, i_age: age, i_name: name, i_sex: sex, i_email: email, d_name: d_name.d_name})
      console.log(data, 'data');
      let res = await this.model('info').select()
      return this.success(res);
    } catch(e) {
      console.log(e);
      return this.fail('服务器开小差')
    }
  }
  async queryInfoAction() {
    let name = this.post('name');
    let department = this.post('department');
    console.log(name+'1');
    console.log(department+'2');
    try {
      let sql = {}
      if (name === '' && department === '') {
        sql = {}
      } else if (name !== '' && department === '') {
        sql = { i_name : ['like','%'+ name +'%'] }
      }  else if (name === '' && department !== '') {
        sql = { d_name: ['like','%'+ department +'%']}
      } else {
        sql = { i_name: ['like','%'+ name +'%'], d_name: ['like','%'+ department +'%']}
      }
      let res = await this.model('info').where(sql).select()
      return this.success(res);
    } catch(e) {
      console.log(e);
      return this.fail('服务器开小差')
    }
  }
}
