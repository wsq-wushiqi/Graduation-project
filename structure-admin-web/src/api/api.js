"use strict";
// 引入vue和axios
import Vue from "vue";
import axios from "axios";
import router from '../router'

import {
    serveUrl,
    getConfig,
    postConfig,
  } from "./config";

// 继承vue的原型方法
Vue.prototype.axios = axios;

// 开发环境调试用户信息
// axios.interceptors.request.use(config => {
//     if (process.env.NODE_ENV === 'development') {
//       config.headers["cust_num"] = "7000374810";
//     }
//     return config;
// });

axios.interceptors.response.use(
  response => {
    let data = response.data;
    if (!data.data) {
      //   登陆成功的回调地址
      return data;
    } else {
      return data;
    }
  },
  error => ({
    code: -1,
    msg: "网络异常"
  })
);

export default {
  // API请求example
  getUserInfo: params => {
    return axios.post("/home/user/queryuser", params);
  },
  login: params => {
    return axios.post("/home/user/login", params);
  },
  logout: params => {
    return axios.post("/home/user/logout", params);
  },
  addWeekly: params => {
    return axios.post("/home/weekly/addWeekly", params);
  },
  test: params => {
    return axios.get("/home/weekly/test", params);
  },
  // 获取个人信息
  myUserInfo: params => {
    return axios.post('/home/userInfo/getUserInfo', params)
  },
  // 修改密码
  changePwd: params => {
    return axios.post('/home/userInfo/changePwd', params)
  },
  // 重置密码
  resetPwd: params => {
    return axios.post('/home/userInfo/resetPwd', params)
  },
  // 申请课程
  applyCourse: params => {
    return axios.post('/home/course/applyCourse', params)
  },
  // 课程申请页面----获取课程列表
  getCourseList: params => {
    return axios.post('/home/course/getCourseList', params)
  },
  // 修改课程申请
  updateCourse: params => {
    return axios.post('/home/course/updateCourse', params)
  },
  // 撤销申请
  cancelApply: params => {
    return axios.post('/home/course/cancelApply', params)
  },
  // 课程审核
  examine: params => {
    return axios.post('/home/course/examine', params)
  },
  // 获取课程安排表
  getArrangeList: params => {
    return axios.get('/home/arrange/getArrangeList', params)
  },
  // 添加课程详情
  addDetail: params => {
    return axios.post('/home/arrange/addDetail', params)
  },
  // 添加参与人员
  addStu: params => {
    return axios.post('/home/arrange/addStu', params)
  },
  // 添加部门
  addDepartment: params => {
    return axios.post('/home/department/addDepartment', params)
  },
  // 获取部门列表
  getDepartmentList: params => {
    return axios.get('/home/department/getDepartmentList', params)
  },
  // 获取部门内的员工
  getStuList: params => {
    return axios.post('/home/department/getStuList', params)
  },
  // 获取参加课程人员的详细信息
  getStuInfo: params => {
    return axios.post('/home/arrange/getStuInfo', params)
  },
  // 申请加入课程
  applyToCourse: params => {
    return axios.post('/home/arrange/applyToCourse', params)
  },
  // 获取个人培训表
  getStuPlanList: params => {
    return axios.get('/home/personPlan/getStuPlanList', params)
  },
  // 添加评价
  addEvaluate: params => {
    return axios.post('/home/evaluate/addEvaluate', params)
  },
  // 检查是否已经添加评价
  checkEvaluate: params => {
    return axios.post('/home/evaluate/checkEvaluate', params)
  },
  // 获取所有课程评价表
  getCourseEvaluate: params => {
    return axios.get('/home/evaluate/getCourseEvaluate', params)
  },
  // 获取所有教师评价
  getAllLecturerEvaluate: params => {
    return axios.get('/home/evaluate/getAllLecturerEvaluate', params)
  },
  // 获取当前教师评价表
  getLecturerEvaluate: params => {
    return axios.get('/home/evaluate/getLecturerEvaluate', params)
  },
  // 获取教师对应的课程评价
  getLecturerCourseEvaluate: params => {
    return axios.get('/home/evaluate/getLecturerCourseEvaluate', params)
  },
  // (讲师)获取我的课程表
  getMyCourse: params => {
    return axios.get('/home/examine/getMyCourse', params)
  },
  // 获取课程对应的学生信息
  getCourseStu: params => {
    return axios.post('/home/examine/getCourseStu', params)
  },
  // 添加学生成绩
  editStuGeade: params => {
    return axios.post('/home/examine/editStuGeade', params)
  },
  // 获取菜单列表
  getMenuList: params => {
    return axios.get('/home/role/getMenuList', params)
  },
  // 添加用户
  addRole: params => {
    return axios.post('/home/role/addRole', params)
  },
  // 获取角色列表
  getRoleList: params => {
    return axios.get('/home/role/getRoleList', params)
  },
  // 修改角色
  updateRole: params => {
    return axios.post('/home/role/updateRole', params)
  },
  // 获取用户列表
  getUserList: params => {
    return axios.post('/home/user/getUserList', params)
  },
  // 添加用户
  addUser: params => {
    return axios.post('/home/userInfo/addUser', params)
  },
  // 修改用户信息
  updateUser: params => {
    return axios.post('/home/userInfo/updateUser', params)
  },
  // 删除用户
  deleteUser: params => {
    return axios.post('/home/userInfo/deleteUser', params)
  },
  // 获取所有菜单
  getTotalMenu: params => {
    return axios.get('/home/role/getTotalMenu', params)
  },
  // 获取个人成绩表
  getMyCheckResult: params => {
    return axios.get('/home/checkResult/getMyCheckResult', params)
  },
  // 获取所有成绩
  getAllCheckResult: params => {
    return axios.get('/home/checkResult/getAllCheckResult', params)
  },
  // 菜单管理----获取菜单管理页面的菜单列表
  getPageMenuList: params => {
    return axios.get('/home/menu/getPageMenuList', params)
  },
  // 菜单管理----添加菜单
  addMenu: params => {
    return axios.post('/home/menu/addMenu', params)
  },
  // 菜单管理----修改菜单
  updateMenu: params => {
    return axios.post('/home/menu/updateMenu', params)
  },
  // 菜单管理----删除菜单
  deleteMenu: params => {
    return axios.post('/home/menu/deleteMenu', params)
  }
  /**
   * API demo
   *
   * getAPI: (params) => {
   *    getConfig.params = params.params
   *    return axios.get('xxxx.do', getConfig)
   * }
   *
   * postAPI: (params) => {
   *     return axios.post('xxxx.do', params, postConfig)
   * }
   */

}
