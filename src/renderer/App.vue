<template>
  <el-container style="height:100vh; border: 0px solid #eee;padding:0;margin:0;" id="app">
    <el-aside width="180px">
      <el-menu style="height:100vh" class="sidebar">
        <el-menu-item index="1" @click="$router.push('/')">
          <i class="el-icon-tickets"></i>
          <span>Notes</span>
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('tags')">
          <i class="el-icon-news"></i>
          <span>Tags</span>
        </el-menu-item>
        <el-menu-item index="3" @click="$router.push('search')">
          <i class="el-icon-search"></i>
          <span>Search</span>
        </el-menu-item>
        <el-menu-item index="3" @click="$router.push('settings')">
          <i class="el-icon-setting"></i>
          <span>Settings</span>
        </el-menu-item>
        <!--  -->
        <el-menu-item index="3" @click="close()" class="is-hidden">
          <i class="el-icon-close"></i>
          <span>Close</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
       <el-header style="text-align: right; font-size: 12px; padding:10px 10px 0 0;">
         <i class="el-icon-caret-top" @click="fullScreen(true)"></i>
         <i class="el-icon-caret-bottom" @click="fullScreen(false)"></i>         
         <i class="el-icon-close" @click="close()"></i>
       </el-header>
      <el-main style="padding:5;margin:5px;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- <div id="app">
    <router-view></router-view>
  </div> -->
</template>
<script>
  import {
    remote
  } from 'electron'
  export default {
    name: 'dent-emr',
    methods: {
      close () {
        let w = remote.getCurrentWindow()
        w.close()
      },
      fullScreen (v) {
        remote.getCurrentWindow().setFullScreen(v)
      }
    }
  }
</script>
<style>
  body {
    padding: 0;
    margin: 0;
    font-family: "Helvetica Neue", Helvetica;
  }

  .sidebar {
    height: 100% !important;
  }

  .is-hidden {
    display: none;
  }
</style>