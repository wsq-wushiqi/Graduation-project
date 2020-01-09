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
// 添加教师信息
export const addLectureInfo = ({ commit }, params) => {
  return Api.addLectureInfo(params).then(response => {
    return response
  })
}
// 获取教师信息列表
export const getLectureList = ({ commit }, params) => {
  return Api.getLectureList(params).then(response => {
    return response
  })
}
// 修改教师信息
export const updateLectureInfo = ({ commit }, params) => {
  return Api.updateLectureInfo(params).then(response => {
    return response
  })
}
// 删除教师信息
export const deleteInfo = ({ commit }, params) => {
  return Api.deleteInfo(params).then(response => {
    return response
  })
}
// 查询教师信息
export const queryLectureInfo = ({ commit }, params) => {
  return Api.queryLectureInfo(params).then(response => {
    return response
  })
}
// 申请课程
export const applyCourse = ({ commit }, params) => {
  return Api.applyCourse(params).then(response => {
    return response
  })
}
// 获取课程列表
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
// 修改课程详情
export const updateDetail = ({ commit }, params) => {
  return Api.updateDetail(params).then(response => {
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
export const getPlanList = ({ commit }, params) => {
  return Api.getPlanList(params).then(response => {
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
// 获取课程评价表
export const getCourseEvaluate = ({ commit }, params) => {
  return Api.getCourseEvaluate(params).then(response => {
    return response
  })
}
// 获取教师评价表
export const getLecturerEvaluate = ({ commit }, params) => {
  return Api.getLecturerEvaluate(params).then(response => {
    return response
  })
}
// 获取组织评价表
export const getOtherEvaluate = ({ commit }, params) => {
  return Api.getOtherEvaluate(params).then(response => {
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