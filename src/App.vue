<template>
  <div id="app">
    <div class="top">
      <img class="img" src="./assets/logo.jpg">
    </div>

    <div class="medium">
      <div class = "tac">
        <el-menu
          class="menu"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据模版</span>
            </template>

            <el-menu-item index="1-1"><router-link to="/db">数据模版生成</router-link></el-menu-item>

          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>打包操作</span>
            </template>

            <el-menu-item index="2-1"><router-link to="/file">项目打包</router-link></el-menu-item>

          </el-submenu>
        </el-menu>
      </div>
      <div class="reight">
        <router-view>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
  .top{
    width: 100%;
    margin: auto;
    background:black;
    height: 80px;
  }
  .img{
    width: 15%;
    height: 80px;
  }
  .tac{
    width: 15%;
    float: left;
  }
  .menu{
    width: 100%;
    height: 650px;
  }
  .reight{
    width: 85%;
    height: 650px;
    float: left;
  }
  .medium{
    width: 100%;
  }
  a {
    text-decoration: none;
    color: white;
  }
  .router-link-active {
    text-decoration: none;
  }
  .el-col-24{
    width: 15%;
  }
</style>
