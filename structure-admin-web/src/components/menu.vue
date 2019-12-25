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
      <el-menu-item index="/writeWeekly">
        <i class="el-icon-menu"></i>
        <span slot="title">模块1</span>
      </el-menu-item>
        <el-menu-item index="/weeklyList">
          <i class="el-icon-location"></i>
          <span slot="title">模块2</span>
        </el-menu-item>
        <el-submenu index='1'>
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span slot="title">信息管理</span>
          </template>
          <el-menu-item index="/personalInfo">
            <i class="el-icon-edit"></i>
            <span slot="title">个人信息管理</span>
          </el-menu-item>
        </el-submenu>
       
      <!--<el-submenu index="/aManage">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-location"></i>-->
          <!--<span slot="title">模块管理一</span>-->
        <!--</template>-->
        <!--<el-menu-item index="/aManage">-->
          <!--<template slot="title">XXX管理</template>-->
        <!--</el-menu-item>-->
      <!--</el-submenu>-->
    <!-- </el-menu> -->
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
      overflow: auto;
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
