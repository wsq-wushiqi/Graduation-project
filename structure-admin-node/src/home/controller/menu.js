const Base = require('./base')
module.exports = class extends Base {
  // 获取菜单列表
  async getPageMenuListAction() {
    let name = this.post('name')
    let router = this.post('router')
    try {
      let sql = {}
      let list = []
      if ((name === '' || name === null) && (router === '' || router === null)) {
        sql = {}
      } else if ((name === '' || name === null) && !(router === '' || router === null)) {
        sql = { m_url: ['like', '%' + router + '%']}
      } else if (!(name === '' || name === null) && (router === '' || router === null)) {
        sql = { m_name: ['like', '%' + name+ '%'] }
      } else {
        sql = { m_name: ['like', '%' + name+ '%'], m_url: ['like', '%' + router + '%'] }
      }
      list = await this.model('menu').where(sql).select()
      return this.success(list)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取菜单列表失败')
    }
  }
  // 添加菜单
  async addMenuAction() {
    let { m_n_id, m_name, m_p_id, m_url, m_icon } = this.post()
    try {
      let mpid = m_p_id === '' ? null : m_p_id
      let check = await this.model('menu').where({ m_name, m_n_id, m_url, _logic: 'OR'}).select()
      if (think.isEmpty(check)) {
        let add = await this.model('menu').add({ m_n_id, m_name, m_p_id: mpid, m_url, m_icon })
        return this.success(add)
      } else {
        return this.fail('添加失败，菜单名称/id/路由不能重复')
      }
    }
    catch(e) {
      console.log(e);
      return this.fail('添加菜单失败')
    }
  }
  // 修改菜单
  async updateMenuAction() {
    let { m_n_id, m_name, m_p_id, m_url, m_icon } = this.post()
    try {
      let update = await this.model('menu').where({ m_n_id }).update({ m_name, m_p_id, m_url, m_icon })
      return this.success(update)
    }
    catch(e) {
      console.log(e);
      return this.fail('修改菜单失败')
    }
  }
  // 删除菜单
  async deleteMenuAction() {
    let m_n_id = this.post('m_n_id')
    try {
      let result = await this.model('menu').where({ m_n_id }).delete()
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('删除菜单失败')
    }
  }
}