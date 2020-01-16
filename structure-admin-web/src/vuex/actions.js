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
// 删除信息
export const delInfo = ({ commit }, params) => {
  return Api.delInfo(params).then(response => {
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
// 申请课程
export const applyCourse = ({ commit }, params) => {
  return Api.applyCourse(params).then(response => {
    return response
  })
}
// 课程申请页面----获取课程列表
export const getCourseList = ({ commit }, params) => {
  return Api.getCourseList(params).then(response => {
    return response
  })
}
// 修改课程申请
export const updateCourse = ({ commit }, params) => {
  return Api.updateCourse(params).then(response => {
    return response
  })
}
// 撤销申请
export const cancelApply = ({ commit }, params) => {
  return Api.cancelApply(params).then(response => {
    return response
  })
}
// 课程审核
export const examine = ({ commit }, params) => {
  return Api.examine(params).then(response => {
    return response
  })
}
// 获取课程安排表
export const getArrangeList = ({ commit }, params) => {
  return Api.getArrangeList(params).then(response => {
    return response
  })
}
// 添加课程详情
export const addDetail = ({ commit }, params) => {
  return Api.addDetail(params).then(response => {
    return response
  })
}
// 添加参与人员
export const addStu = ({ commit }, params) => {
  return Api.addStu(params).then(response => {
    return response
  })
}
// 添加部门
export const addDepartment = ({ commit }, params) => {
  return Api.addDepartment(params).then(response => {
    return response
  })
}
// 获取部门列表
export const getDepartmentList = ({ commit }, params) => {
  return Api.getDepartmentList(params).then(response => {
    return response
  })
}
// 获取部门内的员工
export const getStuList = ({ commit }, params) => {
  return Api.getStuList(params).then(response => {
    return response
  })
}
// 获取参加培训的人员信息
export const getStuInfo = ({ commit }, params) => {
  return Api.getStuInfo(params).then(response => {
    return response
  })
}
// 申请加入课程
export const applyToCourse = ({ commit }, params) => {
  return Api.applyToCourse(params).then(response => {
    return response
  })
}
// 获取个人培训表
export const getStuPlanList = ({ commit }, params) => {
  return Api.getStuPlanList(params).then(response => {
    return response
  })
}
// 添加评价
export const addEvaluate = ({ commit }, params) => {
  return Api.addEvaluate(params).then(response => {
    return response
  })
}
// 检查是否已经添加评价
export const checkEvaluate = ({ commit }, params) => {
  return Api.checkEvaluate(params).then(response => {
    return response
  })
}
// 获取所有课程评价表
export const getCourseEvaluate = ({ commit }, params) => {
  return Api.getCourseEvaluate(params).then(response => {
    return response
  })
}
// 获取所有教师评教表
export const getAllLecturerEvaluate = ({ commit }, params) => {
  return Api.getAllLecturerEvaluate(params).then(response => {
    return response
  })
}
// 获取当前教师评价表
export const getLecturerEvaluate = ({ commit }, params) => {
  return Api.getLecturerEvaluate(params).then(response => {
    return response
  })
}
// 获取教师对应的课程评价
export const getLecturerCourseEvaluate = ({ commit }, params) => {
  return Api.getLecturerCourseEvaluate(params).then(response => {
    return response
  })
}
// (讲师)获取我的课程表
export const getMyCourse = ({ commit }, params) => {
  return Api.getMyCourse(params).then(response => {
    return response
  })
}
// 获取课程对应的学生信息
export const getCourseStu = ({ commit }, params) => {
  return Api.getCourseStu(params).then(response => {
    return response
  })
}
// 添加学生成绩
export const editStuGeade = ({ commit }, params) => {
  return Api.editStuGeade(params).then(response => {
    return response
  })
}
// 获取菜单列表
export const getMenuList = ({ commit }, params) => {
  return Api.getMenuList(params).then(response => {
    return response
  })
}
// 添加用户
export const addRole = ({ commit }, params) => {
  return Api.addRole(params).then(response => {
    return response
  })
}
// 获取角色列表
export const getRoleList = ({ commit }, params) => {
  return Api.getRoleList(params).then(response => {
    return response
  })
}
// 修改角色
export const updateRole = ({ commit }, params) => {
  return Api.updateRole(params).then(response => {
    return response
  })
}
// 获取用户列表
export const getUserList = ({ commit }, params) => {
  return Api.getUserList(params).then(response => {
    return response
  })
}
// 添加用户
export const addUser = ({ commit }, params) => {
  return Api.addUser(params).then(response => {
    return response
  })
}
// 修改用户信息
export const updateUser = ({ commit }, params) => {
  return Api.updateUser(params).then(response => {
    return response
  })
}
// 删除用户
export const deleteUser = ({ commit }, params) => {
  return Api.deleteUser(params).then(response => {
    return response
  })
}
// 获取所有菜单
export const getTotalMenu = ({ commit }, params) => {
  return Api.getTotalMenu(params).then(response => {
    return response
  })
}
// 获取个人成绩表
export const getMyCheckResult = ({ commit }, params) => {
  return Api.getMyCheckResult(params).then(response => {
    return response
  })
}
// 获取所有成绩
export const getAllCheckResult = ({ commit }, params) => {
  return Api.getAllCheckResult(params).then(response => {
    return response
  })
}
// 获取菜单管理页面的菜单列表
export const getPageMenuList = ({ commit }, params) => {
  return Api.getPageMenuList(params).then(response => {
    return response
  })
}
// 菜单管理----添加菜单
export const addMenu = ({ commit }, params) => {
  return Api.addMenu(params).then(response => {
    return response
  })
}
// 菜单管理----修改菜单
export const updateMenu = ({ commit }, params) => {
  return Api.updateMenu(params).then(response => {
    return response
  })
}
// 菜单管理----删除菜单
export const deleteMenu = ({ commit }, params) => {
  return Api.deleteMenu(params).then(response => {
    return response
  })
}
// 我的课程安排----获取个人课程安排
export const getMyCourseArrange = ({ commit }, params) => {
  return Api.getMyCourseArrange(params).then(response => {
    return response
  })
}