'use strict'
const Base = require('./base');
module.exports = class extends Base {
  async addWeeklyAction() {
    let { content, date } = this.post();
    let username = this.user.username;
    try {
      let row = await this.model('content').add({username, content, date});
      console.log(row, 'row')
      return this.success(row);
    } catch(e) {
      return this.fail('服务器开小差');
    }
  }
  async testAction() {
    let { date } = this.get();
    try {
      let row = await this.model('test').select({date});
      console.log(row, 'row')
      return this.success(row);
    } catch(e) {
      return this.fail('服务器开小差');
    }
  }
  
  // async getWeeklyAction() {
  //   let model = this.model('structure_content');
  //   let data = await model.limit(2).select()
  //   try {
  //     // let row = await this.model('content').add({username, content, date});
  //     // console.log(row, 'row')
  //     // return this.success(row);
  //     console.log(data);
      
  //   } catch(e) {
  //     return this.fail('服务器开小差');
  //   }
  // }
}
