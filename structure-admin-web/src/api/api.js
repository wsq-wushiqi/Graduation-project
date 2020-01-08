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
  // 获取员工信息表
  infoList: params => {
    return axios.get("/home/infoManage/infoList", params);
  },
  // 新增员工信息
  addInfo: params => {
    return axios.get("/home/infoManage/addInfo", params);
  },
  // 删除信息
  delInfo: params => {
    return axios.post('/home/infoManage/delInfo', params);
  },
  // 修改信息
  updateInfo: params => {
    return axios.post('/home/infoManage/updateInfo', params);
  },
  // 查询
  queryInfo: params => {
    return axios.post('/home/infoManage/queryInfo', params);
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
  // 添加教师信息
  addLectureInfo: params => {
    return axios.post('/home/lecture/addLectureInfo', params)
  },
  // 获取教师信息列表
  getLectureList: params => {
    return axios.get('/home/lecture/getLectureList', params)
  },
  // 修改教师信息
  updateLectureInfo: params => {
    return axios.post('/home/lecture/updateLectureInfo', params)
  },
  // 删除教师信息
  deleteInfo: params => {
    return axios.post('/home/lecture/deleteInfo', params)
  },
  // 查询教师信息
  queryLectureInfo: params => {
    return axios.post('/home/lecture/queryLectureInfo', params)
  },
  // 申请课程
  applyCourse: params => {
    return axios.post('/home/course/applyCourse', params)
  },
  // 获取课程列表
  getCourseList: params => {
    return axios.get('/home/course/getCourseList', params)
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
  // 修改课程详情
  updateDetail: params => {
    return axios.post('/home/arrange/updateDetail', params)
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
  getPlanList: params => {
    return axios.get('/home/personPlan/getPlanList', params)
  },
  // 添加评价
  addEvaluate: params => {
    return axios.post('/home/evaluate/addEvaluate', params)
  },
  // 检查是否已经添加评价
  checkEvaluate: params => {
    return axios.post('/home/evaluate/checkEvaluate', params)
  },
  // 获取课程评价表
  getCourseEvaluate: params => {
    return axios.get('/home/evaluate/getCourseEvaluate', params)
  },
  // 获取教师评价表
  getLecturerEvaluate: params => {
    return axios.get('/home/evaluate/getLecturerEvaluate', params)
  },
  // 获取组织评价表
  getOtherEvaluate: params => {
    return axios.get('/home/evaluate/getOtherEvaluate', params)
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
