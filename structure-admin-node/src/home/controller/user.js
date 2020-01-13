const Base = require('./base');
module.exports = class extends Base {
    async loginAction() {
        let {username, password} = this.post();
        const salt = 'structure';
        password = think.md5(salt + password);
        // console.log(password,'323333333333333333333333333333333')
        console.log(username);
        try {
            let user = await this.model('user').where({u_username: username}).find(); // 拿输入的用户名去数据库查询
            if(user.u_password && user.u_password == password) {
                await this.session('userInfo',user);
                return this.success("登陆成功");
            } else {
                return this.fail("用户名或密码错误")
            }
        }
        catch(e) {
            console.log(e);
            return this.fail("登录失败")
        }
    }
    async queryuserAction() {
        try {
            let userinfo = await this.model('info').where({ u_username: this.user.u_username }).find()
            return this.success(this.user);
        } catch(e) {
            console.log(e);
            return this.fail(e);
        }
    }
    async logoutAction() {
        try {
            await this.session(null);
            return this.success("登出成功");
        } catch(e) {
            return this.fail(`登出失败${e}`)
        }
    }
    async getUserListAction() {
        try {
            let result = await this.model('user').select()
            return this.success(result)
        }
        catch(e) {
            console.log(e);
            return this.fail('获取用户列表失败')
        }
    }
}
