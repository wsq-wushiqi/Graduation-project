<template>
  <div class="menu">
     <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="rgb(255,255,255)"
      text-color="rgb(28,41,89)"
      router = router
      active-text-color="rgb(28,41,89)">
      <el-submenu index="0">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span slot="title">培训管理</span>
        </template>
        <el-menu-item index="/courseApplication">
          <i class="el-icon-location"></i>
          <span slot="title">课程申请</span>
        </el-menu-item>
        <el-menu-item index="/courseArrange">
          <i class="el-icon-edit"></i>
          <span slot="title">课程安排</span>
        </el-menu-item>
        <el-menu-item index="02">
          <i class="el-icon-edit"></i>
          <span slot="title">培训申请</span>
        </el-menu-item>
        <el-menu-item index="03">
          <i class="el-icon-edit"></i>
          <span slot="title">个人培训计划</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span slot="title">评教管理</span>
        </template>
        <el-menu-item index="11">
          <i class="el-icon-edit"></i>
          <span slot="title">学生评教</span>
        </el-menu-item>
        <el-menu-item index="12">
          <i class="el-icon-edit"></i>
          <span slot="title">评教查看</span>
        </el-menu-item>
        <el-menu-item index="13">
          <i class="el-icon-edit"></i>
          <span slot="title">考核管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index='2'>
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span slot="title">信息管理</span>
        </template>
        <el-menu-item index="/userInfo">
          <i class="el-icon-location"></i>
          <span slot="title">个人资料</span>
        </el-menu-item>
        <el-menu-item index="/staffInfo">
          <i class="el-icon-location"></i>
          <span slot="title">用户信息管理</span>
        </el-menu-item>
        <el-menu-item index="/lectureInfo">
          <i class="el-icon-location"></i>
          <span slot="title">教师信息管理</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "asideItem",
    data(){
      return{
        router: true,
        isCollapse: true,
        label: false
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      labelChange: function() {
        console.log(this.label);
      }
    }
  };
</script>

<style lang="postcss" scoped>
  .menu {
    transition: width 0.28s ease-out;
    width: 180px;
    background: rgb(255, 255, 255);
    height: calc(100vh - 46px);
    & .el-menu{
      width: 100%;
      border-right: none;
      /* overflow: auto; */
    }
    & :hover {
    }
    
  }
  
</style>
<style>
.el-menu-item:hover{
  outline: 0 !important;
  /* color: #409EFF !important; */
  background-color: rgb(232,240,255)!important;
}
.el-menu-item.is-active {
  /* color: #fff !important; */
  background: rgb(210,226,255) !important;
}
.el-submenu__title:focus, .el-submenu__title:hover{
  outline: 0 !important;
  /* color: #409EFF !important; */
  background: none !important;
}
</style>
