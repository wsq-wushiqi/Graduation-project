import {
    USER_INFO
} from "../mutation-types.js";

const state = {
  systemName: '企业员工培训管理系统',
  userInfo:{

  }
};

const mutations = {
  [USER_INFO](state,newData){
    state.userInfo = newData;
  }
}

export default {
  state,
  mutations
}
