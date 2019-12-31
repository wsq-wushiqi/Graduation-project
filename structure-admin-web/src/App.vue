<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: 'App',
    computed: {
      ...mapGetters(["userInfo"])
    },
    data(){
      return {

      }
    },
    mounted() {

    },
    methods:{
      ...mapActions([
        "getUserInfo",
      ])
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  a {
    text-decoration: none;
  }
  a:link {
    color:cadetblue;
  }
  a:visit {
    color:darkslategray;
  }
  /* 固定表头高度 */
  .el-table__header tr,
  .el-table__header th {
    padding: 0px;
    height: 40px;
  }
  .el-table__body tr.current-row>td {
    background-color: rgb(210,226,255);
  }
  .el-table tbody tr:hover>td {
    background-color: rgb(232,240,255)!important;
    /* color: aliceblue; */
  }
</style>
