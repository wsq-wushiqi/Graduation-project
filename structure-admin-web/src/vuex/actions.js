import Api from "../api/api";
import * as types from "./mutation-types";

// example
export const getUserInfo = ({commit},params) => {
  return Api.getUserInfo(params).then(response => {
    commit(types.USER_INFO,response.data);
    return response;
  })
}
// login
export const login = ({ commit }, params) => {
  return Api.login(params).then(response => {
    return response;
  })
}
// logout
export const logout = ({ commit }, params) => {
  return Api.logout(params).then(response => {
    return response;
  })
}
// add weekly
export const addWeekly = ({ commit }, params) => {
  return Api.addWeekly(params).then(response => {
    return response;
  })
}
// test
export const test = ({ commit }, params) => {
  return Api.test(params).then(response => {
    return response;
  })
}
// 获取员工信息表格
export const infoList =({ commit }, params) => {
  return Api.infoList(params).then(response => {
    return response
  })
}
// 添加员工信息
export const addInfo = ({ commit }, params) => {
  return Api.addInfo(params).then(response => {
    return response
  })
}
// 删除信息
export const delInfo = ({ commit }, params) => {
  return Api.delInfo(params).then(response => {
    return response
  })
}
// 修改信息
export const updateInfo = ({ commit }, params) => {
  return Api.updateInfo(params).then(response => {
    return response
  })
}
// 查询
export const queryInfo = ({ commit }, params) => {
  return Api.queryInfo(params).then(response => {
    return response
  })
}
// 获取个人信息
export const myUserInfo = ({ commit }, params) => {
  return Api.myUserInfo(params).then(response => {
    return response
  })
}
// 修改密码
export const changePwd = ({ commit }, params) => {
  return Api.changePwd(params).then(response => {
    return response
  })
}
// 重置密码
export const resetPwd = ({ commit }, params) => {
  return Api.resetPwd(params).then(response => {
    return response
  })
}
