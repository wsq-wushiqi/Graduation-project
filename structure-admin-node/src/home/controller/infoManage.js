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
    let {department, name, sex, age, email, username} = this.get();
    let id = UUID.v1()
    // let username = name
    const salt = 'structure';
    let password = think.md5(salt + '123456');
    let result = ''
    try {
      let data3 = await this.model('user').where({username: username}).select()
      if (think.isEmpty(data3)) {
        let data = await this.model('info').add({ id, department, name, username, sex, age, email });
        let data2 = await this.model('user').add({ id, username, password })
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
      let data = await this.model('info').where({id: ['=', id]}).delete()
      let data1 = await this.model('user').where({id: ['=', id]}).delete()
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
      let data = await this.model('info').where({id: id}).update({department: department, age: age, name: name, sex: sex, email: email})
      // let data1 = await this.model('user').where({id: id}).update({username: name})
      console.log(data, 'data');
      console.log(data1, 'data1');
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
    try {
      // let data = await this.model('info').where({id: id}).update({department: department, name: name, age: age, sex: sex, email: email})
      // console.log(data, 'data');
      let res = await this.model('info').where({name: name, department: department, _logic: 'OR'}).select()
      return this.success(res);
    } catch(e) {
      console.log(e);
      return this.fail('服务器开小差')
    }
  }
}
