const Base = require('./base')
const UUID = require('node-uuid')
function translateDataToTree(data) {
  let parents = data.filter(value => value.m_p_id === 'undefined' || value.m_p_id === null || value.m_p_id === '')
  let children = data.filter(value => value.m_p_id !== 'undefined' && value.m_p_id !== null && value.m_p_id !== '')
  let translator = (parents, children) => {
    parents.forEach((parent) => {
      children.forEach((current, index) => {
        if (current.m_p_id === parent.m_n_id) {
          let temp = JSON.parse(JSON.stringify(children))
          temp.splice(index, 1)
          translator([current], temp)
          typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
        }
      })
    })
  }
  translator(parents, children)
  return parents
}
module.exports = class extends Base {
  // 获取所有菜单
  async getTotalMenuAction() {
    try {
      let data = await this.model('menu').select()
      let result = translateDataToTree(data)
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取菜单列表失败')
    }
  }
  // 根据角色获取菜单列表
  async getMenuListAction() {
    try {
      let rid = JSON.parse(this.user.r_id)
      let menu = []
      for (let i = 0; i < rid.length; i++) {
        let mid = await this.model('role').where({ r_id: rid[i] }).find()
        menu.push(mid.r_authority)
      }
      let list = []
      for (let j = 0; j < menu.length; j++) {
        let menus = JSON.parse(menu[j])
        for (let i=0; i<menus.length; i++) {
          for (let j=0; j<menus[i].length; j++) {
            list.push(menus[i][j])
          }
        }
      }
      list = Array.from(new Set(list))
      let menuList = await this.model('menu').select()
      let data = []
      for (let i=0; i<list.length; i++) {
        for (let j=0; j<menuList.length; j++) {
          if (list[i] === menuList[j].m_n_id) {
            data.push(menuList[j])
          }
        }
      }
      let result = translateDataToTree(data)
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取菜单列表失败')
    }
  }
  async addRoleAction() {
    let r_name =  this.post('r_name')
    let r_id = UUID.v1()
    let r_describe = this.post('r_describe')
    let r_authority = this.post('r_authority')
    try {
      let name = await this.model('role').where({ r_name }).find()
      if (think.isEmpty(name)) {
        let result = await this.model('role').add({ r_id, r_name, r_authority, r_describe })
        return this.success(result)
      } else {
        return this.fail('角色已经存在')
      }
    }
    catch(e) {
      console.log(e);
      return this.fail('添加角色失败')
    }
  }
  async getRoleListAction() {
    let name = this.post('name')
    console.log(name);
    
    try {
      let sql = {}
      if (name === '' || name === null) {
        sql = {}
      } else {
        sql = { r_name: ['like', '%' + name + '%']}
      }
      let list = await this.model('role').where(sql).select()
      return this.success(list)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取角色列表失败')
    }
  }
  async updateRoleAction() {
    let r_name = this.post('r_name')
    let r_describe = this.post('r_describe')
    let r_authority = this.post('r_authority')
    let r_id = this.post('r_id')
    try {
      let result = await this.model('role').where({ r_id: r_id }).update({ r_name, r_describe, r_authority })
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('修改失败')
    }
  }
}